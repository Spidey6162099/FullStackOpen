// const http = require('http')
const cors=require('cors')

let notes = [  
    {    id: "1",    content: "HTML is easy",    important: true  },  
    {    id: "2",    content: "Browser can execute only JavaScript",    important: false  },
    {    id: "3",    content: "GET and POST are the most important methods of HTTP protocol",    important: true  },
    {    id: "4",    content: "GET and POfaafa",    important: true  }]


const generateId=()=>{
    return String((notes.length>0?Math.max(...notes.map(n=>Number(n.id))):0)+1)
}

// const server=http.createServer((request,response)=>{
//     response.writeHead(200,{"Content-Type":"application/json"})
//     response.end(JSON.stringify(notes))
// })

// const PORT=3001
// server.listen(PORT)
// console.log(`server running on ${PORT}`)
const express=require('express')
const app=express();

app.use(cors())
app.use(express.json())

app.get('/',(request,response)=>{
    response.send('<h1>Hello world</h1>')
})

app.get('/api/notes',(request,response)=>{
    response.json(notes)
})

app.get('/api/notes/:id',(request,response)=>{
    const id=request.params.id
    const noteToBeShown=notes.find(note=>note.id===id)

    if(noteToBeShown){
        response.json(noteToBeShown)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id',(request,response)=>{
    const id=request.params.id
    notes=notes.filter(note=>note.id!=id)
    response.send(204).end()
})

app.post('/api/notes',(request,response)=>{

    const body=request.body

    if(!body.content){
        return response.status(400).json({
            "error":"empty content"
        })
    }
    const note={
        ...body,
        "important":Boolean(body.important)||false,
        "id":generateId()

    }
    
    // note.id=String(generateId()+1)
    notes=notes.concat(note)

    response.json(note)
})

const PORT=3001
app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON PORT "+PORT )
})

