
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
const errorHandler=(error,request,response,next)=>{
    console.log(error.message)

    if(error.name=='CastError'){
        response.status(400).send({"error":"malformed id"})
    }
    else if(error.name=="ValidationError"){
        return response.status(400).json({error:error.message})
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

module.exports={unknownEndpoint,errorHandler,requestLogger}