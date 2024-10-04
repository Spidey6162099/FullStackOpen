const User=require('../models/user')
const jwt=require('jsonwebtoken')

const requestLogger=(request,response,next)=>{
    console.log("method: "+request.method)
    console.log("path:"+request.path)
    console.log("body: "+request.body)
    next()
}

// const titleAndUrlChecker=(request,response,next)=>{
//     if(request.method.toString()=='POST'){
//         if(!request.body.url||!request.body.title){
//             return response.status(400).json({"error":"missing essential details"})
//         }
        
//     }
//     next()
// }

const errorHandler=(error,request,response,next)=>{
    // console.log(error.message)

    if(error.name==='CastError'){
       return response.status(400).send({"error":"malformed id"})
    }
    else if(error.name==="ValidationError"){
       return  response.status(400).send({"error":`${error.message}`})
    }
    else if(error.name=='MongoServerError'&&error.message.includes('E11000 duplicate key error')){
      return response.status(400).send({"error":"username not unique"})
    }
    
      next(error)
    

}

const getToken=(request,resposne,next)=>{
   const authorization=request.get('authorization')
   if(authorization&&authorization.startsWith('Bearer')){
      request.token=authorization.replace('Bearer ','')
   }
   else{
      request.token=null
   }
   next()
}

const userExtractor=async (request,response,next)=>{
   if(request.method!='POST'&&request.method!='DELETE'){
     return next()
   }

   const authorization=request.token;
   const decodedId=jwt.decode(authorization,process.env.SECRET)
   if(!decodedId){
      return response.status(401).json({"error":"invalid token"})
  }
   // const userId=request.body.user.toString()
   request.user= await User.findById(decodedId.id)

   next()
}

module.exports={requestLogger,errorHandler,getToken,userExtractor}