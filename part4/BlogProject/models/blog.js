const mongoose=require('mongoose')
const { Transform } = require('stream')
const blogSchema=new mongoose.Schema({
    title:String,
    author:String,
    url: String,
    likes: Number
})
blogSchema.set("toJSON",{transform:(recievedObj,sentObj)=>{
    sentObj.id=sentObj._id.toString()
    delete sentObj._id;
    delete sentObj.__v;

}})


module.exports=mongoose.model('Blog',blogSchema)