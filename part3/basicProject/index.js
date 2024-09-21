// const http = require('http')
const cors=require('cors')
const Note=require('./modules/note')



const express=require('express')
const app=express();

app.use(cors())
app.use(express.json())
// app.use(express.static('dist'))

app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes',(request,response)=>{
    Note.find({}).then(notes=>{
        response.json(notes)
    })
})

app.get('/api/notes/:id',(request,response)=>{
    Note.findById(request.params.id).then(noteById=>{
        if(noteById){
            response.json(noteById)
        }
        else{
            response.status(404).end()
        }
       
    })
    .catch(err=>{
        response.status(500).end();
    })
})

app.delete('/api/notes/:id',(request,response)=>{
    Note.findById(request.params.id).then(noteById=>{
        response.json(noteById)
    })
})

app.post('/api/notes',(request,response)=>{

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


})

const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON PORT "+PORT )
})

