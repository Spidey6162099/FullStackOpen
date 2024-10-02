const express=require('express')

const notesRouter=express.Router()
const Note=require('../modules/note')
// 

notesRouter.get('/',async(request,response,next)=>{
    

    const Notes= await Note.find({})

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
    // console.log('I WORK')

    const body=request.body

    const note= new Note({
        "content":body.content,
        "important":Boolean(body.important)||false,


    })


    
    const result=await note.save()
    response.status(201).json(result)

    // note.save().then(result=>{
    //         response.status(201).json(result)
    // })
    // .catch(err=>{
    //     next(err)
    // })


})

notesRouter.put('/:id',(request,response,next)=>{
    let id=request.params.id;

    const body=request.body;


    const note= {
        "content":body.content,
        "important":body.important
    }

    const result=Note.findByIdAndUpdate(id,note,{new:true,runValidators:true})
    response.json(result)
})

module.exports=notesRouter