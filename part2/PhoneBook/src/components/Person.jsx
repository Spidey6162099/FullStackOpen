const Person=({selectedPerson,handleDelete})=>{
    return (
    <div>
    {selectedPerson.map((person)=><div key={person.name}>{person.name}  {person.number}  <button  onClick={()=>{handleDelete(person.id)}}>delete</button></div>)}
  </div>
    )
  }
  export default Person