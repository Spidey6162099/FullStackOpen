import axios from "axios"
const baseUrl="/api/notes"

let token=null

const setToken=newToken=>{
    token=`Bearer ${newToken}`
}

const getAll=()=>{
    return axios.get(baseUrl).then((response)=>{
        return response.data
    })
}

const create=async (newObject)=>{
    const config={
        headers:{Authorization:token},
    }
    const response =await  axios.post(baseUrl,newObject,config)

    return response.data
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
    update,
    setToken
}