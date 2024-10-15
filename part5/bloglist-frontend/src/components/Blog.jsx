import Togglable from "./Togglable"
import { useState } from "react"

import blogsService from "../services/blogs"
import blogs from "../services/blogs"




const Blog = ({ blog,handleDelete,handleLikes }) => {
  const [visible,setVisible] = useState(false)
  const toggleVisibility=()=>{setVisible(!visible)}
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  const ShowButton=()=>{
    return(<button className="button-28" style={hideWhenVisible} onClick={()=>{setVisible(!visible)}}>show</button>)
  }  
  const HideButton=()=>{
    return (<button className="button-28" style={showWhenVisible} onClick={()=>{setVisible(!visible)}}>hide</button>)
  }

  const LikeButton=()=>{
    return (<button className="button-28" onClick={(handleLikes)}>like</button>)
  }
  return(
  
  <div className="blog">
    <div>
    {blog.title} : {blog.author}  <button className="button-28" onClick={()=>handleDelete(blog.id)}>delete</button><LikeButton></LikeButton><ShowButton></ShowButton><HideButton></HideButton>
    </div>
   
    <div>
    
    <div style={showWhenVisible}>
      <p>url:{blog.url} <button className="button-28" onClick={()=>{window.open(blog.url)}}>go to</button> </p>
      <p>likes:{blog.likes}</p>
        
    </div>
    </div>

  </div>  

  )
  
}

export default Blog