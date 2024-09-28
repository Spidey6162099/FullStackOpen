const express=require('express')
const app=express()
const cors=require('cors')
const logger=require('./utils/logger')
const blogRouter=require('./controllers/blogs')
const config=require('./utils/config')
const middleware=require('./utils/middleware')


const mongoose=require('mongoose')
mongoose.connect(config.MONGODB_URI).then(result=>{
    logger.info("succesfully connected to mongodb")
})
.catch(err=>{
    logger.info("connection failed"+err.message)
})
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogRouter)

module.exports=app