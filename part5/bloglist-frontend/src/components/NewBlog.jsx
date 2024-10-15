import { useState } from "react"
import blogService from '../services/blogs'


const NewBlog=({addBlog})=>{
    const [author,setAuthor]=useState('')
    const [url,setUrl]=useState('')
    const [title,setTitle]=useState('')
    const [likes,setLikes]=useState('')
    const handleSubmit=async (event)=>{
        event.preventDefault()
        const newBlog={
          author,
          likes,
          title,
          url
        }
    
        addBlog(newBlog)
        setAuthor('')
        setLikes('')
        setTitle('')
        setUrl('')
      }



    return (      <form onSubmit={handleSubmit} >
        <div>
        <label>Author</label>
        <input type="text" value={author} onChange={({target})=>{setAuthor(target.value)}}/>
        </div>
      
        <div>
          <label>URL</label>
        <input type="url" value={url} onChange={({target})=>{setUrl(target.value)}}/>
        </div>
      <div>
        <label>Title</label>
      <input type="text" value={title} onChange={({target})=>{setTitle(target.value)}}/>
      </div>
     
      <div>
        <label>Likes</label>
      <input type="number" value={likes} onChange={({target})=>{setLikes(target.value)}}/>
      </div>
      
      <button type="submit">add</button>
    </form>)
}
export default NewBlog