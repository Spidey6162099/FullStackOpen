// const mongoose=require('mongoose')
import mongoose from 'mongoose'

if(process.argv.length<3){
    console.log('supply the password mate')
    process.exit(1)
}

const password=process.argv[2];

const url=`mongodb+srv://cosmicspidey79:${password}@cluster0.7ghpg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteScheme=new mongoose.Schema({
    content:String,
    important:Boolean
})

const Note=mongoose.model('Note',noteScheme)

const newNote=new Note({
    content:"hello world",
    important:true
})

newNote.save().then(result=>{
    console.log('note saved'+result)
    mongoose.connection.close()
})