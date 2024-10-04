import Togglable from "./Togglable"
import { useState } from "react"




const Blog = ({ blog,handleDelete }) => {
  const [visible,setVisible] = useState(false)
  const toggleVisibility=()=>{setVisible(!visible)}
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
  const ShowButton=()=>{
    return(<button style={hideWhenVisible} onClick={()=>{setVisible(!visible)}}>show</button>)
  }  
  const HideButton=()=>{
    return (<button style={showWhenVisible} onClick={()=>{setVisible(!visible)}}>hide</button>)
  }
  // const handleLikes=async()=>{
  //   blog.likes+=1
  //   const newBlog={
  //     author:blog.author,
  //     url:blog.url,
  //     title:blog.title,
  //     likes:blog.likes
  //   }
  //   await axios.

    
  // }
  // const LikeButton=()=>{
  //   return (<button onClick={(handleLikes)}>like</button>)
  // }
  return(
  
  <div className="blog">
    <div>
    {blog.title} : {blog.author}  <button onClick={()=>handleDelete(blog.id)}>delete</button><ShowButton></ShowButton><HideButton></HideButton>
    </div>
   
    <div>
    
    <div style={showWhenVisible}>
      {blog.url} {blog.likes}
    </div>
    </div>

  </div>  

  )
  
}

export default Blog