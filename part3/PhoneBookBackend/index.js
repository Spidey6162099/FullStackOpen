const express = require('express')
const app=express()
const morgan = require('morgan')
const cors =require('cors')
const Person=require('./modules/person')

// let persons=

// [
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

// const generateId=()=>{
//   while(true){
//     const newId=Math.floor(Math.random()*1000000)
//     if(!persons.some((person)=>person.id===newId)){
//       return newId;
//     }
//   }
// }

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan('tiny'))



app.get('/api/persons',(request,response)=>{
    Person.find({}).then(result=>{
      response.json(result)
    })
})

app.get('/api/persons/info',(request,response)=>{
  Person.countDocuments().then(result=>response.json(result))
})

app.get('/api/persons/:id',(request,response,next)=>{
  Person.findById(request.params.id).then(result=>{
    if(result){
      response.json(result)
    }
    else{
      response.status(404).end()
    }

  })
  .catch(err=>{
    next(err)
  })
})

app.get('/info',(request,response)=>{
    const dateObj=new Date()
    response.send(`<h2> Phonebook has info for ${persons.length} people</h2>
            <p>${dateObj}<p>`)
})

app.delete('/api/persons/:id',(request,response,next)=>{
  const id=request.params.id
  console.log(id)

  Person.findByIdAndDelete(id).then(result=>{
    if(result){
      return response.status(204).json()
    }
    else{
      return response.status(404).end()
    }
 
  })
  .catch(err=>{
    next(err)
  })

  // if(!personToBeDeleted){
  //   return response.status(405).end()
  // }
  // persons=persons.filter((note)=>note.id!=id)
  // response.status(204).end()
})

app.put('/api/persons/:id',(request,response)=>{
  
  const obj=request.body
  console.log(obj);
  const newObj={
    "name":obj.name,
    "numrbt":obj.number
  }
  
  Person.findByIdAndUpdate(request.params.id,newObj,{new:true}).then(result=>{
      response.status(204).json()
  })

})
// morgan.token('content',(request,response)=>{
//   return JSON.stringify(request.body)
// })
// app.use(morgan('::method :url :response-time ms :content'))

app.post('/api/persons/',(request,response,next)=>{
  const body=request.body
  if(!body.name||!body.number){
    return response.status(400).json({
      "error":"empty name or contact"
    })
}
Person.exists({"name":`${body.name}`}).then(result=>{

    if(result){
      return response.status(400).json({
        "error":"duplicate entry"
  
    })
    }
    const person=new Person({"name":`${body.name}`,"number":`${body.number}`})
    person.save().then(result=>{
      response.status(201).json(result)
    })
    .catch(err=>{
      next(err)
    })
})

.catch(err=>{
  next(err)
})
})


const errorHandler=(error,request,response,next)=>{
  console.error(error.message)
  if(error.name==="CastError"){
    return response.status(400).json({"error":"malformed id"})
  }
  next(error)
}

app.use(errorHandler)
const PORT=process.env.PORT||3001
app.listen(PORT,()=>{
    console.log("app running on server localhost"+PORT)
})
