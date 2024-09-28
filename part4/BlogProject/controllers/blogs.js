const express=require('express')
const blogRouter=express.Router()
const Blog=require('../models/blog')
const logger = require('../utils/logger')

blogRouter.get('/',(request,response)=>{
    Blog.find({}).then(result=>{
        response.json(result)
    }).catch(err=>{
        logger.info(err)
        response.status(404).end()
    })
})

blogRouter.post('/',(request,response)=>{
    const blog=new Blog(request.body)
    blog.save()
    .then(result=>{
        response.status(201).json(result)
    })
    })
module.exports=blogRouter