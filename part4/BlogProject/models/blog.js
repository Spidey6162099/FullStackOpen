const mongoose=require('mongoose')
const { Transform } = require('stream')
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    
    author:String,
    url:{
        type:String,
        required:true

    } ,
    likes: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
       }
})
blogSchema.set("toJSON",{transform:(recievedObj,sentObj)=>{
    sentObj.id=sentObj._id.toString()
    delete sentObj._id;
    delete sentObj.__v;

}})


module.exports=mongoose.model('Blog',blogSchema)