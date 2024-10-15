import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken=(auth)=>{
  token=`Bearer ${auth}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create=async (blog)=>{
  const config={
    headers:{Authorization:token},
}
  const result=await axios.post(baseUrl,blog,config)
  return result.data

}

const del= async (id)=>{
  const config={
    headers:{Authorization:token},
}
  const url= `/api/blogs/${id}`
  const result =await axios.delete(url,config)
  return result.data
}

const update=async (id,newBlog)=>{
  const config={
    headers:{Authorization:token},
}
 const url= `/api/blogs/${id}`
 const result =await axios.put(url,newBlog,config);
 return result.data;
}
export default { getAll,setToken ,create,del,update}