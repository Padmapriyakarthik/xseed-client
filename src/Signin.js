import React, { useState} from "react";
import {login} from "./interaction";
function Signin({handleLogin,history}){
    const [user,setUser]=useState({email:"",password:""})
    const [message,setMessage]=useState("");
    const [custommessage,setcustomMessage]=useState("");

    const loggingin=()=>{
        const {email,password} =user
        
        if(email==="")
        {
            setcustomMessage("Enter valid email")
        }
        else if(password==="")
        {
            setcustomMessage("Enter valid Password")
        }
        else
        {
            setcustomMessage(" ")
        login(email,password)
       .then((data)=>{
            const {token,message}=data;
            console.log(message);
            if(token)
            {
                setMessage(message);
                setcustomMessage(" ");
                handleLogin(user,token)
                //alert(message);
                history.push(`/matches`)
                
            }
            else
            {
                setcustomMessage(message);
            }        
        })
        .catch((error)=>{
           console.log("error");
        })
        }
    }

    return(
        <div className="bg">
        <div className="container p-5">
            <div className="row p-5">
                <div className="offset-3 col-6">
                    <form>
                        <h1 style={{fontFamily:"revert" ,textAlign:"center",color:"white",fontSize:"40px"}}>Sign in</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" onChange={(e)=>{
                            setUser((usr)=>({...usr, email:e.target.value}))
                        }}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>{
                            setUser((usr)=>({...usr, password:e.target.value}))
                        }}/>
                    </div>
                    <p style={{color: "red",fontSize:"20px"}}>{custommessage}</p> 
                    <div className="row">
                        <div className="offset-5 col-4">
                        <button  type="submit" className="btn btn-primary" onClick={e => {e.preventDefault();loggingin()}}>SignIn</button>
                        </div>
                    </div>

                    <p style={{color: "red",fontSize:"20px"}}>{message}</p> <br/>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Signin;