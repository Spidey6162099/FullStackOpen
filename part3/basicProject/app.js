
const express=require('express')
const app=express();
const cors=require('cors')
const Note=require('./modules/note')
const config=require('./utils/config')
const logger=require('./utils/logger')
const middleware=require('./utils/middleware')
const notesRouter=require('./controllers/notes')
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

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

// app.use(notesRouter)
module .exports=app