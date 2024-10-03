const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minLength:3
    },
    name:String,
    passwordHash:String,
   
    blogs:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Blog'
        }
    ]
})
userSchema.set('toJSON',{
    transform:(recievedObj,sentObj)=>{
        sentObj.id=sentObj._id.toString()
        delete sentObj._id
        delete sentObj.__v
        delete sentObj.passwordHash
    }
})

module.exports=mongoose.model('User',userSchema)