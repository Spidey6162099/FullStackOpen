// import mongoose from 'mongoose'
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()



const url=process.env.MONGO_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema=new mongoose.Schema({
    // id:Number,
    name:String,
    number:String

})

PersonSchema.set("toJSON",{
    transform:(recievedObj,sentObj)=>{
        sentObj.id=sentObj._id.toString()
        delete sentObj._id
        delete sentObj.__v
    }
})

module.exports=mongoose.model('Person',PersonSchema)
