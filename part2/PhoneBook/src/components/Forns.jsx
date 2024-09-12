const Form=(props)=>{
    return (
      <form onSubmit={props.handleSubmit}>
      <div>
        name: <input value={props.newName.name} onChange={props.handleInputName} type='text'/>
      </div>
      <div>
        contact no:<input type="number" value={props.newName.number} onChange={props.handleInputNumber}></input>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
   
    )
  }
  export default Form