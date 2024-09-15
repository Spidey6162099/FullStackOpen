import axios from 'axios'
import { useEffect, useState } from 'react'
import contacts from './services/contacts'
import Form from './components/Forns'
import Person from './components/Person'


const Notification=({message})=>{

  const messageStyle={
    color: "red",
    background: "lightgrey",
    fonSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10  
  }

  if(!message.type){
    return null
  }

  else if(message.type==="error"){
      return <div style={messageStyle}>{`ERROR:${message.content}`}</div>
  }

  else if(message.type=="message"){
    const newObj={...messageStyle,color:"green"}
    return <div style={newObj}>{`SUCCESS:${message.content}`}</div>
  }

}


const Filter=(props)=>{
return ( <input type='text' onChange={props.handleFilter}></input>)
}
const App = () => {
  const [persons, setPersons] = useState([

  ]) 

  const[filter,setFilter]=useState('')
  const [newName, setNewName] = useState({name:"abcd",number:"12345678"})
  const[message,setMessage]=useState({type:"",content:""})


  const retrievePersons=()=>{
    
    contacts.getAll()
    .then((response)=>{
        setPersons(response)
    })
  }

  useEffect(retrievePersons,[])

  const handleInputName=(event)=>{
    setNewName({...newName,name:event.target.value})
  }

  const handleInputNumber=(event)=>{
    setNewName({...newName,number:event.target.value})
  }

  const handleSubmit=(event)=>{
    event.preventDefault()


    if(persons.some((person)=>person.name===newName.name)){
      const person=persons.find(p=>p.name===newName.name)
      
      
      if(window.confirm(`do you wish to update contact details for ${newName.name}`)){
        const updatedPerson={...person,number:newName.number}
        contacts.update(updatedPerson,updatedPerson.id)
        .then((response)=>{
          const personsExceptUpdated=persons.filter(p=>p.id!=person.id)
          setPersons(personsExceptUpdated.concat(updatedPerson))
          setMessage({type:"message",content:`${updatedPerson.name} succesfully updated`})
          setTimeout(()=>{
            setMessage({})
          },5000)
        })
        .catch(err=>{
          console.log(err)
          setMessage({type:"error",content:`${person.name} already deleted from server`})
          setPersons(persons.filter(p=>p.id!=person.id))
          setTimeout(()=>{
            setMessage({})
          },5000)
        })
      }

    }
    else{
    // setPersons(persons.concat(newName))
    contacts.create(newName).then((response)=>{
      setPersons(persons.concat(response))
      setMessage({type:"message",content:`${response.name} succesfully saved`})
      setTimeout(()=>{
        setMessage({})
      },5000)
    })
  }
  
    setNewName({name:"abcd",number:12345678})
    
   
  }
  

  const handleFilter=(event)=>{
     setFilter(event.target.value)
      // setSelectedPerson(event.target.value===""?persons:persons.filter((person)=>person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const handleDelete=(id)=>{
    const noteToBeDeleted=persons.find(person=>person.id===id)
    if(window.confirm("are you sure mate you want to delete"+ ` ${noteToBeDeleted.name}`))
    contacts.del(id)
    .then((response)=>{
      setPersons(persons.filter(person=>person.id!=noteToBeDeleted.id))
      setMessage({type:"message",content:`${noteToBeDeleted.name} succesfully deleted`})
      setTimeout(()=>{
        setMessage({})
      },5000)
    })
    .catch(err=>{
      setMessage({type:"error",content:`${noteToBeDeleted.name} already deleted from server`})
      setPersons(persons.filter(p=>p.id!=noteToBeDeleted.id))
      setTimeout(()=>{
        setMessage({})
      },5000)
    })
  }

  const personsAfterFilter=filter===''?persons:persons.filter((person)=>person.name.toLowerCase().includes(event.target.value.toLowerCase()));
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <h2>Filter by name</h2>
      <Filter handleFilter={handleFilter}></Filter>
     
      <h2>add a contact</h2>

      <Form handleSubmit={handleSubmit} handleInputName={handleInputName} handleInputNumber={handleInputNumber} newName={newName}></Form>
      <h2>Numbers</h2>
     
      <Person selectedPerson={personsAfterFilter} handleDelete={handleDelete}></Person>
    </div>
  )
}

export default App
