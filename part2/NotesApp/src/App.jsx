
import { useEffect, useState } from "react"
import axios from "axios"
import Notes from "./components/Notes"
import notesObj from "./services/notes.js"
import loginService from "./services/login.js" 

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
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [user,setUser]=useState(null)

  const handleLogin=async (event)=>{
    event.preventDefault()
    try{
      const user=await loginService.login({username,password})
 

      window.localStorage.setItem('loggedNoteAppUser',JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      notesObj.setToken(user.token)
    }
    catch(exception){

      setErrorMessage('wrong credentials')
      setTimeout(()=>{
        setErrorMessage('')
      },5000)
    }
    
    
  }


  const loadNotes=async ()=>{
    const response=await notesObj.getAll()
    
      setNotes(response)
    
  }

  const loadToken=()=>{
    const loggedNoteUser=window.localStorage.getItem('loggedNoteUser')
    if(loggedNoteUser){
      const user=JSON.parse(loggedNoteUser)
      setUser(user)
      notesObj.setToken(user.token)
    }
  }

useEffect(loadNotes,[])
useEffect(loadToken,[])
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
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={handleSubmit}>
    <input type="text" value={newNote} onChange={handleNewNote}/>
    <button type="submit">add</button>
  </form>
  )

  return (
    <div>
      
      <h1>Notes</h1>
      <Notification errorMessage={errorMessage}></Notification>
      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged-in</p>
      {noteForm()}
    </div>
    }

      <button onClick={()=>{setShowAll(!showAll)}}>show {showAll? 'important':'all'}</button>
      <ul>
        {notesList.map((note)=><Notes note={note} key={note.id} toggleImportance={()=>toggleImportance(note.id)}></Notes>)}
      </ul>

      
      <Footer></Footer>
    </div>
  )
}

export default App
