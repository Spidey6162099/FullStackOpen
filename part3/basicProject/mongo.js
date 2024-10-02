// const mongoose=require('mongoose')
// import mongoose from 'mongoose'
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

// if(process.argv.length<3){
//     console.log('supply the password mate')
//     process.exit(1)
// }

// const password=process.argv[2];

// const url=`mongodb+srv://cosmicspidey79:1234@testcluster.ci4ie.mongodb.net/?retryWrites=true&w=majority&appName=TestCluster`
// mongoose.set('strictQuery',false)

mongoose.connect(process.env.TEST_MONGODB_URI)

const noteScheme=new mongoose.Schema({
    content:String,
    important:Boolean
})

const Note=mongoose.model('Note',noteScheme)

const newNote=new Note({
    content:"bye bye",
    important:false
})

newNote.save().then(result=>{
    console.log('note saved'+result)
    mongoose.connection.close()
})

// export {Note};