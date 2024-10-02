const mongoose=require('mongoose')
const noteScheme=new mongoose.Schema({
  content:{
    type:String,
    minLength:5,
    required:true
  },
 important:Boolean,
 user:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
 }
})

noteScheme.set("toJSON",{
    transform:(recievedObj,sentObj)=>{
        sentObj.id=sentObj._id.toString()
        delete sentObj._id;
        delete sentObj.__v;
    }
})




module.exports=mongoose.model('Note',noteScheme)