const express=require('express')
require('express-async-errors')
const app=express()
const cors=require('cors')
const logger=require('./utils/logger')

const blogRouter=require('./controllers/blogs')
const userRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')

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
app.use(express.static('dist'))
app.use(middleware.requestLogger)
app.use(middleware.getToken)

app.use('/api/blogs',middleware.userExtractor,blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)

app.use(middleware.errorHandler)

module.exports=app