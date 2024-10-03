const express=require('express')
const blogRouter=express.Router()
const Blog=require('../models/blog')
const logger = require('../utils/logger')
const User=require('../models/user')
const jwt= require('jsonwebtoken')

blogRouter.get('/',async (request,response)=>{

    const result=await Blog.find({}).populate('user',{username:1,name:1,id:1})      
    response.status(200).json(result)
})

blogRouter.get('/:id',async(request,response)=>{
    const result=await Blog.findById(request.params.id)
    response.status(200).json(result)
})

blogRouter.post('/',async(request,response)=>{
    const body=request.body

    // const decodedId=jwt.verify(request.token,process.env.SECRET)
    // if(!decodedId){
    //     return response.status(401).json({"error":"invalid token"})
    // }

    const user= request.user
    const newObj={...request.body,likes:request.body.likes||0
        ,user:user._id
    }
    const blog=new Blog(newObj)
   
    

   const result= await blog.save()
   user.blogs=user.blogs.concat(result._id)
   await user.save()
    
    response.status(201).json(result)
})

blogRouter.delete('/:id',async(request,response)=>{
    const id=request.params.id
    const result=await Blog.findById(id)

    if (!result) {
        return response.status(404).json({ error: 'Blog not found' });
    }
    const blogUser=await User.findById(result.user.toString())

    const actualUser=request.user


    if(actualUser._id.toString()!=blogUser._id.toString()){
        return response.status(401).json({'error':"not authorized to delete other user blogs"})
    }
    const finalResult=await Blog.findByIdAndDelete(id)
    
    response.status(204).end()
})

blogRouter.put('/:id',async(request,response)=>{
    const id=request.params.id
    const body=request.body
    const blog={
        title:body.title,
            "author":body.author,
            "url": body.url,
            "likes": body.likes
    }

    
    const result=await Blog.findByIdAndUpdate(id,blog,{new:true,runValidators:true})
    if (!result) {
        return response.status(404).json({ error: 'Blog not found' });
    }
    response.json(result)

})
module.exports=blogRouter