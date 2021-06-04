import React,{useState} from "react";
import {NavLink} from "react-router-dom"
import {signup} from "./interaction"
import './App.css';
import logo from "./Images/IPL-Logo-w.png";
function Signup(){
    const [user,setUser]=useState({email:"",password:"",name:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");
    const [enable,setEnable]=useState(1);

    const submit=()=>{
        
        setcustomMessage(" ");
        setMessage("");
        let {name,email,password} =user
        if(name==="")
        {
            setcustomMessage("Enter your name")
        }
        else if(email==="")
        {
            setcustomMessage("Enter valid email")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid password")
        }
        else{
         
        signup(email,name,password)
        .then((data)=>{
            
                const {message,status}=data;
                if(status!==400){
                    setEnable(0); 
                    document.getElementById("name").readOnly = true;
                    document.getElementById("email").readOnly = true;
                    document.getElementById("pass").readOnly = true;  
                }
                if(status===400){
                    document.getElementById("email").style.borderColor = "red";
                    document.getElementById("email").focus();
                }
                setMessage(message);
               
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }
    
   
    return(
      
        <div  className="bg">
            <div className="upon">
        <ul className="nav justify-content-between p-3">
            <li className="nav-item"><img src={logo} alt="IPL" width="70" height="60"/></li>
        </ul>
        <div className="container">
            <div className="row">
                <div className="col-6 p-2">
                    <h1 style={{fontFamily:"revert" ,textAlign:"center",color:"white",fontSize:"40px"}}>IPL</h1>
                    <h2 style={{fontFamily:"revert" ,textAlign:"center",color:"white",fontSize:"38px"}}>India's Biggest Sporting Event</h2>
                </div>
                <div className="col-4">
                <form id="form">
                <div className="form-group">
                    <input type="text" className="form-control" id="name"  placeholder="Name" onChange={(e)=>{
                            setUser((usr)=>({...usr, name:e.target.value}))
                        }}/>
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="email" onChange={(e)=>{
                            setUser((usr)=>({...usr, email:e.target.value}))
                        }}/>
                </div>
               
                <div className="form-group">
                    <input type="password" className="form-control" id="pass" placeholder="Password" onChange={(e)=>{
                            setUser((usr)=>({...usr, password:e.target.value}))
                        }}/>
                </div>
                <p style={{color: "red",fontSize:"20px"}}>{custommessage}</p> <br/>
                {enable ?<button style={{color:"white"}} type="submit" className="btn btn-primary"  onClick={e => {e.preventDefault();submit()}}>Signup</button>
                 :<></>} <span style={{fontSize:"22px",color:"white"}}>  /           
                 <NavLink
                     to="/Signin"
                     activeStyle={{
                       fontWeight: "bold",
                       color: "red"
                     }}
                   >
                     <span style={{color:"white" ,fontSize:"20px"}}>&nbsp;Signin</span>
                   </NavLink>
                   </span> 
                
                </form>
                <p style={{color: "red",fontSize:"20px"}}>{message}</p> <br/>
                </div>
               
            </div>
        </div>
        </div>
        </div>  
        
    )
}

export default Signup;