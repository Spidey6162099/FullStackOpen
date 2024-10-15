import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Error,Success } from './components/Error'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'





const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')





  const [errorMessage,setErrorMessage]=useState('')
  const [successMessage,setSuccesssMessage]=useState('')
  const [user,setUser]=useState(null)

  const handleLogin=async (event) => {
    event.preventDefault()
    try{
      const userLogged=await loginService.login({ username,password })
      window.localStorage.setItem('loggedInUser',JSON.stringify(userLogged))
      setUser(userLogged)
      setUsername('')
      setPassword('')
      blogService.setToken(userLogged.token)
      setSuccesssMessage('logged in succesfully')
      setTimeout(() => {
        setSuccesssMessage('')
      },5000)
    }
    catch(exception){
      console.log(exception)
      setErrorMessage('invalid credentials')
      setTimeout(() => {
        setErrorMessage('')
      },5000)
    }


  }



  const loginForm = () => (

    <div className='loginForm'>
      <h2>Login to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>username:</label>

          <input
            className='input'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            className='input'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className="button-27" type="submit" >login</button>
      </form>
    </div>

  )



  const loadToken=() => {
    const loggedInUser=window.localStorage.getItem('loggedInUser')
    if(loggedInUser){
      const user=JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }

  useEffect(() => {
    const blogsInDb=blogService.getAll().then(Blogs => {
      Blogs.sort((a,b) => {
        if(a.likes>b.likes){
          return -1
        }
        else if(a.likes<b.likes){
          return 1
        }
        else{
          return 0
        }
      })
      console.log(Blogs)
      setBlogs( Blogs )
    }

    )
  }, [])

  useEffect(loadToken,[])

  const logOut=() => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleDelete=async(id) => {
    try{
      const result =await blogService.del(id)
      setBlogs(blogs.filter(blog => blog.id!==id))
      setSuccesssMessage('blog deleted successfully')
      setTimeout(() => {
        setSuccesssMessage('')
      },5000)
    }
    catch(err){
      setErrorMessage('Not Authorized')
      setTimeout(() => {
        setErrorMessage('')
      },5000)
    }
  }

  const blogFormRef=useRef()

  const addBlog=async (newBlog) => {
    try{
      const savedBlog=await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setSuccesssMessage('blog saved successfully')
      setTimeout(() => {
        setSuccesssMessage('')
      },5000)
    }
    catch(exception){
      setErrorMessage(`ERROR:${exception.message}`)
      setTimeout(() => {
        setErrorMessage('')
      },5000)

    }
    blogFormRef.current.toggleVisibility()
  }

  const handleLikes=async(id,blog) => {
    console.log(blog)
    const newBlog={
      author:blog.author,
      url:blog.url,
      title:blog.title,
      likes:blog.likes+1,
      user:blog.user,
      id:blog.id
    }
    const savedBlog=await blogService.update(id,newBlog)
    let blogsWithUpdated=blogs.map(blog => blog.id===id?newBlog:blog)

    setBlogs(blogsWithUpdated)


  }


  return (
    <div>
      <Error errorMessage={errorMessage}></Error>
      <Success successMessage={successMessage}></Success>

      <h2 className='header'>Blogs-Galore</h2>
      {user!==null?
        <div>
          <p>{user.name} logged in<button onClick={logOut} className='button-28'>Log out</button></p>
          <Togglable buttonLabel="new blog"ref={blogFormRef}>
            <NewBlog addBlog={addBlog}></NewBlog>
          </Togglable>
        </div>

        :<Togglable buttonLabel="login">
          {loginForm()}
        </Togglable>}

      {blogs.map(blog =>

        <Blog key={blog.id} blog={blog} handleDelete={handleDelete} handleLikes={() => handleLikes(blog.id,blog)}/>
      )}
    </div>
  )
}

export default App