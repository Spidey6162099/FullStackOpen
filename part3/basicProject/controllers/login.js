const User=require('../modules/user')
const loginRouter=require('express').Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

loginRouter.post('/',async(request,response)=>{
    const {username,password}=request.body

    const user=await User.findOne({username})


    const passwordCorrect=user===null?false:bcrypt.compare(password,user.passwordHash)
    if(!(user&&passwordCorrect)){
        return response.status(401).json({
            'error':'invaid username or password'
        })
    }
    const useForToken={
        username:user.username,
        id:user._id
    }

    const token=jwt.sign(useForToken,process.env.SECRET,{expiresIn:60*60})
    response.status(200).send({token,username:user.username,name:user.name})
})
module.exports=loginRouter