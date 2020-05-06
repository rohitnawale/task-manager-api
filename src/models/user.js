const mongoose = require("mongoose")
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const userSchema = new mongoose.Schema( {
    name: {
        type: "String",
        required: true,
        trim:true
    },

    email:{
        type:"String",
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },

    password:{
        type:'String',
        required:true,
        trim:true,
        minLength:7,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain "Password"')
            }
        }

    },
    age:{
        type:"Number",
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive number')
            }
        }
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
}, {
    timestamps:true
})

userSchema.virtual('tasks', {
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.toJSON =  function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email:email})
    if(!user){
        throw new Error("Unable to login")
    }

    try{
        const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
        const hashedPassword = await bcrypt.hash(password, salt)
        if(hashedPassword == user.password) return user
        else throw new Error("Unable to login")
    }
    catch(e){
        throw new Error("Error while querying")
    }
    
}

//hash the plaintext password
userSchema.pre('save', async function(next){
    const user = this

    //console.log(user.password)

    if(user.isModified('password')){
        const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
        user.password = await bcrypt.hash(user.password, salt)
    }
    next()
})

//delete user tasks when user is deleted
userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User