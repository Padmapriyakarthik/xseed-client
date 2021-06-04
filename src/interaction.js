import axios from 'axios';
const BASE_URL = 'http://localhost:4000';

export const login = (email,password)=>{
    return axios
    .post(`${BASE_URL}/signin`,{email,password})
    .then((res)=>res.data).catch((error)=>(error.response.data))
}

export const signup=(email,name,password)=>{
    return axios
    .post(`${BASE_URL}/signup`,{email,name,password})
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const getMatchesCount=()=>{
    return axios
    .get(`${BASE_URL}/matches/summary`)
    .then((res)=>res.data).catch((error)=>(error.response.data));
}


export const getmatchlist=(token,page,limit)=>{
    return axios
    .get(`${BASE_URL}/matches`,{ 
        params: { page,limit } ,
        headers:{
            authorization:token
        }
    })
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const getmatchdetail=(token,id)=>{
    return axios
    .get(`${BASE_URL}/matches/`+id,{
        headers:{
            authorization:token
        }
    })
    .then((res)=>res.data).catch((error)=>(error.response.data));
}