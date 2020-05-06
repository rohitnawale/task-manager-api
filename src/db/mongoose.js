const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})





// rick.save().then(()=>{
//     console.log(rick)
// }).catch((error)=>{
//     console.log("Error", error)
// })



// const taskOne = new Task({
//     description:"Clean the house",
//     completed:true
// })

// taskOne.save().then(()=>{
//     console.log(taskOne)
// }).catch((error)=>{
//     console.log(error)
// })