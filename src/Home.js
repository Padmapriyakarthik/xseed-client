import React,{useState,useEffect} from "react";
import {getMatchesCount} from "./interaction";
import { Route,Switch} from "react-router-dom";
import TopBar from "./TopBar";
import ListMatches from "./ListMatches";
import ViewMatch from "./ViewMatch"
import './App.css';
function Home(props){

    
  
   const[dataCount,setCount]=useState(0);
   const [loading,setLoading]=useState(0);
  
   const matchesCount=()=>{  
        getMatchesCount(null,null).then((data)=>{
           const {count}=data;
            setCount(count);
            setLoading(1);
        }).catch((error)=>{
            console.log(error);
        })
    }
   
    useEffect(() => {
        if(!loading){
            matchesCount();
        }  
      },[loading]);
   
    return(
           
        <div>
            <TopBar props={props}/>
            <div className="container-fluid ">    
                <div className="row content">
                <div className="col-12 " id="content">  
                   <Switch>
                      { /*routes.map((route,index)=>{
                            <Route key={index} exact={route.exact} path={route.path} component={<route.main/>}/>
                      })*/}
                      <Route exact path={`/matches`} >{loading ? <ListMatches history={props.history} count={dataCount}/> : <></>} </Route>
                        {  /*<Route   path={`/Notes/addnotes`} token={token}><AddNotes /></Route>*/}
                      <Route path={`/matches/:id`}><ViewMatch path={props.location.pathname} history={props.history}/></Route>
                   </Switch> 
                </div>
                </div>
                </div>
            </div>
            
        )
    
   
}

export default Home;

/*
   
                      <Route   path={`/:orgname/add_user`}><Add_user portal={portalusers}/></Route>  */