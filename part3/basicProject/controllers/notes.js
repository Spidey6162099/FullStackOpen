const express=require('express')

const notesRouter=express.Router()
const Note=require('../modules/note')
// notesRouter.use(cors())
// notesRouter.use(express.json())
// notesRouter.use(express.static('dist'))

// notesRouter.get('/',(request,response)=>{
//     response.send('<h1>Hello world</h1>')
// })

notesRouter.get('/',(request,response)=>{
    Note.find({}).then(notes=>{
        response.json(notes)
    })
})

notesRouter.get('/:id',(request,response,next)=>{
  Note.findById(request.params.id).then(noteById=>{
    if(noteById){
      response.json(noteById)
    }
        else{
            response.status(404).end()
        }
       
    })
    .catch(err=>{
        next(err)
    })
})

notesRouter.delete('/:id',(request,response,next)=>{
    Note.findByIdAndDelete(request.params.id).then(noteById=>{
        response.status(204).end()
    })
    .catch(err=>{
        next(err)
    })
})

notesRouter.post('/',(request,response,next)=>{

    const body=request.body

    if(!body.content){
        return response.status(400).json({
            "error":"empty content"
        })
    }
    const note= new Note({
        "content":body.content,
        "important":Boolean(body.important)||false,


    })
    
    note.save().then(result=>{
            response.json(result)
    })
    .catch(err=>{
        next(err)
    })


})

notesRouter.put('/:id',(request,response,next)=>{
    let id=request.params.id;
    console.log(id)
    const body=request.body;
    console.log(body)

    const note= {
        "content":body.content,
        "important":body.important
    }

    Note.findByIdAndUpdate(id,note,{new:true,runValidators:true}).then(result=>{
        response.json(result)
    })
})

module.exports=notesRouter