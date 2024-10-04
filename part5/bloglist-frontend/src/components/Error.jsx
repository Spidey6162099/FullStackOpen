const Error = ({ errorMessage }) => {
    if (!errorMessage) return null; // Return null if there's no error message to display
  
    return (
      <div className="error">
        {errorMessage}
      </div>
    );
  };


const Success=({successMessage})=>{
  if(!successMessage){return null;}
  
  return (
    <div className="success">
        {successMessage}
    </div>
  )
}
export {Error,Success}