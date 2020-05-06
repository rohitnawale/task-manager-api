const express  = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/tasks')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//     res.status(503).send("Ooops!! Website is under maintainance")
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log("Server is running on port  "+ port)
})

// const bcrypt = require('bcryptjs')

// const myFuction = async () =>{
//     const password = "Red1234"
//     const salt = '$2b$10$X4kv7j5ZcG39WgogSl16au'
//     const hashedPassword = await bcrypt.hash(password, salt)
//     console.log(hashedPassword)
// }

// myFuction()

// const jwt = require('jsonwebtoken')

// const myFuctionfunction = async () =>{
//     const token = jwt.sign({_id:"abc123"}, 'qwertyuiop', {expiresIn:'1 second'})
//     console.log(token)
//     const data = jwt.verify(token, 'qwertyuiop')
//     console.log(data)
// }
// myFuctionfunction()

// const main = async () => {
//     // const task = await Task.findById('5eadb72d3eeb7f3864c3ce60')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5eac6b6281b9a901c8711723')
//     await user.populate('tasks').execPopulate() 
//     console.log(user.tasks)
// }

// main()

// const multer = require('multer')
// const upload = multer({
//     dest:'images'
// })

// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// })