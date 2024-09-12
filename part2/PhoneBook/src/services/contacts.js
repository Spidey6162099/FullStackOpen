import axios from "axios";

const baseUrl='http://localhost:3001/persons';

const getAll=()=>{
    return axios.get(baseUrl)
    .then(resposne=>resposne.data)
}

const update=(newObj,id)=>{
    const newUrl=baseUrl+`/${id}`;

    return axios.put(newUrl,newObj)
    .then(response=>response.data)
}

const create=(newObj)=>{
    return axios.post(baseUrl,newObj)
    .then(response=>response.data)
    .catch(err=>{console.log(err)})
}
const del=(id)=>{
    const newUrl=baseUrl+`/${id}`;
    return axios.delete(newUrl)
    .then(response=>response.data)
}
export default {create,update,getAll,del}