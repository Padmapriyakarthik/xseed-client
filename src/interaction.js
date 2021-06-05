import axios from 'axios';
const BASE_URL ='https://xseed-server.herokuapp.com' ;

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

export const getUserFavourite=(token)=>{
    return axios
    .get(`${BASE_URL}/users`,{
        headers:{
            authorization:token
        }
    }).then((res)=>res.data).catch((error)=>(error.response.data));
}

export const setUserFavourite=(token,favouriteteam)=>{
    return axios
    .put(`${BASE_URL}/users/favourite`,{favouriteteam},{
        headers:{
            authorization:token
        }
    }).then((res)=>res.data).catch((error)=>(error.response.data));
}

export const removeUserFavourite=(token)=>{
    return axios
    .put(`${BASE_URL}/users/remove`,{},{
        headers:{
            authorization:token
        }
    }).then((res)=>res.data).catch((error)=>(error.response.data));
}
export const getcurrentuser=(token)=>{
    return axios
    .get(`${BASE_URL}/users`,{
        headers:{
            authorization:token
        }
    }).then((res)=>res.data).catch((error)=>(error.response.data));
}