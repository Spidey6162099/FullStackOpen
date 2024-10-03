const Notes=({note,toggleImportance})=>{

  
    return (
    

      <li className="note" key={note.id}>{note.content}
      <button onClick={toggleImportance}>  {note.important?'make not important':'make important'}</button>
      </li>
    

    )
  }

  export default Notes