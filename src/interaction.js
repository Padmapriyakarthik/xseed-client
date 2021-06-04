import axios from 'axios';
const BASE_URL =/*'https://xseed-server.herokuapp.com'*/ 'http://localhost:4000';

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

export const getMatchesCount=(team,season)=>{
    return axios
    .get(`${BASE_URL}/matches/summary`,{ params: { season,team}})
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const getmatchlist=(token,page,limit,season,team)=>{
    return axios
    .get(`${BASE_URL}/matches`,{ 
        params: { page,limit,season,team} ,
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

export const getSeason=()=>{
    return axios
    .get(`${BASE_URL}/season`)
    .then((res)=>res.data).catch((error)=>(error.response.data));
}

export const getTeam=()=>{
    return axios
    .get(`${BASE_URL}/team`)
    .then((res)=>res.data).catch((error)=>(error.response.data));
}
