const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const url=process.env.MONGODB_URI

// console.log("connecting to url "+url)

mongoose.connect(url).then(result=>{
    console.log("successfully connected")
})
.catch(err=>{
    console.log("failure"+err.message)
})

const personScheme=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:true
    },
    number:{
        type:String,
        minLength:8,
        validate: {
            validator: function(v) {
              return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
          required: [true, 'User phone number required']
        }

    })

personScheme.set("toJSON",{
    transform:(recievedObj,sentObj)=>{
        sentObj.id=sentObj._id.toString()
        delete sentObj._id;
        delete sentObj.__v;
    }
})


// const Note=mongoose.model('Note',noteScheme)

module.exports=mongoose.model('Person',personScheme)