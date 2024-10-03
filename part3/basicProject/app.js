
const express=require('express')
require('express-async-errors')
const app=express();
const cors=require('cors')
const Note=require('./modules/note')
const config=require('./utils/config')
const logger=require('./utils/logger')
const middleware=require('./utils/middleware')

const notesRouter=require('./controllers/notes')
const userRouter=require('./controllers/users')
const loginRouter=require('./controllers/login')

const dotenv=require('dotenv')

dotenv.config()
const mongoose=require('mongoose')
mongoose.set('strictQuery', false)

// logger.info('connecting to url '+config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then( result => {
  logger.info("successfully connected")
})
.catch(err=>{
    logger.info("failure"+err.message)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// app.use(notesRouter)
module .exports=app