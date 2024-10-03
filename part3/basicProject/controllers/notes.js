const express=require('express')
const jwt=require('jsonwebtoken')
const notesRouter=express.Router()
const Note=require('../modules/note')
const User=require('../modules/user')
// 
const getTokenFrom=(request)=>{
 const authorization = request.get('authorization')

 if(authorization && authorization.startsWith('Bearer')){
    return authorization.replace('Bearer ','')
 }
 return null
}
notesRouter.get('/',async(request,response,next)=>{
    


    const Notes= await Note.find({}).populate('user',{name:1,username:1})

    response.status(200).json(Notes)


})

notesRouter.get('/:id',async (request,response,next)=>{
//   try{
    const note=await Note.findById(request.params.id)
    if(note){
        response.status(200).json(note)

    }
    else{
        return response.status(404).end()
    }

})

notesRouter.delete('/:id',async (request,response,next)=>{

    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()

})

notesRouter.post('/',async(request,response,next)=>{
    
    const decodedId=jwt.verify(getTokenFrom(request),process.env.secret)
    console.log(decodedId)
    if(!decodedId){
        return response.status(401).json({error:"invalid token"})
    }
    const user=await User.findById(decodedId.id)

    const body=request.body
    // const user=await User.findById(body.userId)

    const note= new Note({
        "content":body.content,
        "important":Boolean(body.important)||false,
        user:user._id

    })


    
    const result=await note.save()
    user.notes=user.notes.concat(result._id)
    await user.save()
    response.status(201).json(result)




})

notesRouter.put('/:id',async (request,response,next)=>{
    let id=request.params.id;

    const body=request.body;


    const note= {
        "content":body.content,
        "important":body.important
    }

    const result=await Note.findByIdAndUpdate(id,note,{new:true,runValidators:true})
    response.json(result)
})

module.exports=notesRouter