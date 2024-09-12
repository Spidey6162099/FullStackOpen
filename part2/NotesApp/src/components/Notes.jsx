const Notes=({note,toggleImportance})=>{

  
    return (
    

      <li className="note" key={note.id}>{note.content}
      <button onClick={toggleImportance}>  {note.important?'not important':'important'}</button>
      </li>
    

    )
  }

  export default Notes