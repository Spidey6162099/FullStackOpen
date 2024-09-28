const requestLogger=(request,response,next)=>{
    console.log("method: "+request.method)
    console.log("path:"+request.path)
    console.log("body: "+request.body)
    next()
}

module.exports={requestLogger}