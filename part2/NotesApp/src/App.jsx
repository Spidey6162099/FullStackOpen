
import { useEffect, useState } from "react"
import axios from "axios"
import Notes from "./components/Notes"
import notesObj from "./services/notes.js"

const Notification = ({ errorMessage }) => {
  if (!errorMessage) return null; // Return null if there's no error message to display

  return (
    <div className="error">
      {errorMessage}
    </div>
  );
};

const Footer=()=>{
  const footerStyle={
    color:'green',
    fontStyle:'italic',
    fontSize:16
  }

  return (
    <div style={footerStyle}>
      <br></br>
      <em>University of Helinski CS Department</em>
    </div>
  )
}
const App = () => {
  const [notes,setNotes]=useState([])
  const [newNote,setNewNote]=useState('new note .........')
  const [showAll,setShowAll]=useState(true)
  const [errorMessage,setErrorMessage]=useState("")


  const loadNotes=()=>{
    notesObj.getAll()
    .then((response)=>{
      setNotes(response)
    })
  }

useEffect(loadNotes,[])

  const handleSubmit=(event)=>{
 
    event.preventDefault()
    let newObj={
      content:newNote,
      important:Math.random()<0.5
    }

    notesObj.create(newObj)
    .then((response)=>{
      
      setNotes(notes.concat(response))
      setNewNote("")
    })
    
  
  }

  const handleNewNote=(event)=>{

    setNewNote(event.target.value)
    
    
  }

  const notesList= showAll ? notes : notes.filter((note)=>note.important===true)

  const toggleImportance=(id)=>{
    // const url=`http://localhost:3001/notes/${id}`
    const noteToBeChanged=notes.find((note)=>note.id===id);

    const newObj={...noteToBeChanged,important:!noteToBeChanged.important}
    notesObj.update(id,newObj).then((response)=>{
      setNotes(notes.map((note)=>{return note.id!=id?note:response}))

    })
    .catch(err=>{
      setErrorMessage(`note ${noteToBeChanged.content} was already deleted`)
      setNotes(notes.filter(note=>note.id!=noteToBeChanged.id))

      setTimeout(()=>{
        setErrorMessage("")
      },5000)
    })

  }

  return (
    <div>
      
      <h1>Notes</h1>
      <Notification errorMessage={errorMessage}></Notification>

      <ul>
        {notesList.map((note)=><Notes note={note} key={note.id} toggleImportance={()=>toggleImportance(note.id)}></Notes>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newNote} onChange={handleNewNote}/>
        <button type="submit">add</button>
      </form>
      <button onClick={()=>{setShowAll(!showAll)}}>show {showAll? 'important':'all'}</button>
      <Footer></Footer>
    </div>
  )
}

export default App
