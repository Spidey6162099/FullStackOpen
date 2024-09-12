import axios from "axios"
const baseUrl="http://localhost:3001/notes"

const getAll=()=>{
    return axios.get(baseUrl).then((response)=>{
        return response.data
    })
}

const create=(newObject)=>{
    return axios.post(baseUrl,newObject).then((response)=>{
        return response.data
    })
}

const update=(id,newObject)=>{
    const newUrl=baseUrl+`/${id}`
    return axios.put(newUrl,newObject).then((response)=>{
        return response.data
    })
}

export default{
    getAll,
    create,
    update
}