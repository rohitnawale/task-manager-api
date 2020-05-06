// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id.getTimestamp('in'))

MongoClient.connect(connectionURL, {useNewUrlParser:true, useUnifiedTopology:true}, (error, client)=>{
    if(error){
        return console.log("Unable to connect to database")
    }

    console.log("Connected !!")
    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: "Andrew",
    //     age:27
    // }, (error, result)=>{
    //     if(error){
    //         return console.log("unable to insert")
    //     }
    //     console.log(result.ops)
    // })
//     db.collection('tasks').insertMany([
//         {
//             description:"Clean the house",
//             completed: true
//         },
//         {
//             description:"Renew inspection",
//             completed:false
//         }

//     ], (error, result)=>{
//         if(error){
//             return console.log("unable to insert")
//         }
//         console.log(result.ops)
//     })

    // db.collection('users').findOne({name:"Rick"}, (error, user)=>{
    //     if(error){
    //         return console.log("Error")
    //     }
    //     console.log(user)

    // })

    // db.collection('users').find({}).toArray((error, users)=>{
    //     console.log(users)
    // })

    const updatePromise = db.collection('tasks').updateMany({
        completed: false
    },{
        $set:{
            completed:true
        }
    })

    updatePromise.then((result)=>{
        console.log(result.modifiedCount)
    }).catch((error)=>{
        console.log(error)
    })
    
    
})

