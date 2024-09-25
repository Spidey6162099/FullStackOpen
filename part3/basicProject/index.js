
const express=require('express')
const app=express();
const cors=require('cors')
const Note=require('./modules/note')
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes',(request,response)=>{
    Note.find({}).then(notes=>{
        response.json(notes)
    })
})

app.get('/api/notes/:id',(request,response,next)=>{
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

app.delete('/api/notes/:id',(request,response,next)=>{
    Note.findByIdAndDelete(request.params.id).then(noteById=>{
        response.status(204).end()
    })
    .catch(err=>{
        next(err)
    })
})

app.post('/api/notes',(request,response,next)=>{

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

app.put('/api/notes/:id',(request,response,next)=>{
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
app.use(errorHandler)

const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON PORT "+PORT )
})

