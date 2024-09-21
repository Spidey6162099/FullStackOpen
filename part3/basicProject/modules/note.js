const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const url=process.env.MONGODB_URI

console.log("connecting to url "+url)

mongoose.connect(url).then(result=>{
    console.log("successfully connected")
})
.catch(err=>{
    console.log("failure"+err.message)
})

const noteScheme=new mongoose.Schema({
    content:String,
    important:Boolean
})

noteScheme.set("toJSON",{
    transform:(recievedObj,sentObj)=>{
        sentObj.id=sentObj._id.toString()
        delete sentObj._id;
        delete sentObj.__v;
    }
})


// const Note=mongoose.model('Note',noteScheme)

module.exports=mongoose.model('Note',noteScheme)