const userRouter=require('express').Router()
const User=require('../models/user')
const bcrypt=require('bcrypt')

userRouter.get('/',async(request,response)=>{
    const users=await User.find({}).populate('blogs')
    response.json(users)
})
userRouter.post('/',async(request , response)=>{
    const {username,name,password}=request.body

    if(password.length<3){
        return response.status(400).json({"error":"password shorter than 3 characters"})
    }
    const saltRounds=10
    const passwordHash=await bcrypt.hash(password,saltRounds)
    const newUser=new User({
        username,
        name,
        passwordHash
    })

    const savedUser= await newUser.save()
    console.log(savedUser)
    response.status(201).json(savedUser)

})

module.exports=userRouter