const express = require('express')
const app=express()
const morgan = require('morgan')
const cors =require('cors')

let persons=

[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId=()=>{
  while(true){
    const newId=Math.floor(Math.random()*1000000)
    if(!persons.some((person)=>person.id===newId)){
      return newId;
    }
  }
}

app.use(cors())
app.use(express.json())
// app.use(express.static('dist'))
app.use(morgan('tiny'))



app.get('/api/persons',(request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id',(request,response)=>{
    const id =request.params.id

    const personToBeShown=persons.find(n=>n.id===id)

    if(!personToBeShown){
        response.status(404).end()
    }
    else{
        response.json(personToBeShown)
    }
})

app.get('/info',(request,response)=>{
    const dateObj=new Date()
    response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
            <p>${dateObj}<p>`)
})

app.delete('/api/persons/:id',(request,response)=>{
  const id=request.params.id
  const personToBeDeleted=persons.find((note)=>note.id===id)

  if(!personToBeDeleted){
    return response.status(405).end()
  }
  persons=persons.filter((note)=>note.id!=id)
  response.status(204).end()
})

app.put('/api/persons/:id',(request,response)=>{
  
  const obj=request.body
  console.log(obj);
  
  const personsWithoutOldObject=persons.filter(person=>person.id!=obj.id)
  // console.log(personsWithoutOldObject)
  persons=personsWithoutOldObject.concat(obj)

  response.status(204).end()
})
// morgan.token('content',(request,response)=>{
//   return JSON.stringify(request.body)
// })
// app.use(morgan('::method :url :response-time ms :content'))

app.post('/api/persons/',(request,response)=>{
  const body=request.body
  if(!body.name||!body.number){
    return response.status(400).json({
      "error":"empty name or contact"
    })
}
else if(persons.some(person=>person.name===body.name)){
  return response.status(400).json({
    "error":"duplicate entry"
  })
}
const generatedId=generateId()
const newPerson={...body}
newPerson.id=String(generateId())
persons=persons.concat(newPerson)
response.json(newPerson)
})

const PORT=3001
app.listen(PORT,()=>{
    console.log("app running on server localhost"+PORT)
})
