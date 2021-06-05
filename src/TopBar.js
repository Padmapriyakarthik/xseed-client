
import logo from "./Images/IPL-Logo-w.png";

import { useEffect, useState } from "react";
import { getcurrentuser} from "./interaction";
function TopBar(props){

   const[user,setuser]=useState({});
   const [loading,setLoading]=useState(0);
   const token=localStorage.getItem('auth_token')

   const Currentuser=()=>{  
        getcurrentuser(token).then((data)=>{
            let {user}=data;
            setuser(user);
            setLoading(1);
            }).catch((error)=>{
                console.log(error);
            })
    }
   
    useEffect(() => {
        if(!loading){
            Currentuser();
        }  
      },[loading]);
  
      const predict=()=>{
        props.props.history.push(`/matches/winpredictor`)
      }
    const logout=()=>{
        console.log(props);
        props.props.history.push(`/logout`)
    }
    return(
        <div>
            <nav id="theme" className="navbar navbar-inverse nav-dark bg-dark" style={{backgroundColor:"darkgrey"}}>
                <div className="container-fluid">
                    <div className="navbar-header">
                    <li className="navbar-brand" ><img src={logo} alt="IPL" width="50" height="30"/></li>
                    <li className="navbar-brand" style={{textAlign:"right",color:"white"}}>{user.name?<span>Hai {user.name}!</span>:<></>}</li>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                    <button id="predict" type="button" style={{color:"white"}} className="btn btn-link" onClick={predict}>Win Predictor</button>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                    <button type="button" style={{color:"white"}} className="btn btn-link" onClick={logout}>Logout</button>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopBar;