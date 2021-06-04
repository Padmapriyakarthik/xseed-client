import React, { useState,useContext} from "react"
import './App.css';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home";
import RedirectLogin from "./RedirectLogin";
import Logout from "./Logout";

export const WrapperContext = React.createContext(
  {
      user:null,
      token:null,
      isLoggedIn:false,
      logout:()=>{}
  }
)

const WrapperRoute = ({render,...restProps})=>{
  //const { isLoggedIn,user}=useContext(WrapperContext);
  const token=localStorage.getItem("auth_token");
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(token){
                   return <Redirect to={`/matches`} /> 
              }else{
                  return render(props)
              }
          }
      }
      />
  )
}

export const ProtectRoute = ({component: Component, ...restProps})=>{
  const { user}=useContext(WrapperContext);
  const token=localStorage.getItem("auth_token");
  return(
      <Route
      {...restProps}
      render = {
          (props)=>{
              if(token){
                return (
                  <>
                      <Component {...props} user={user}/>  
                  </>
              )
                 
              }else{
                return <Redirect to="/signup"/>
              }
          }
      }
      />
  )

}
function App(){

  const [user, setUser]=useState(null);
  const [token,setToken]=useState(null);
  const [isLoggedIn, setIsLoggedIn]=useState(false);

  const logout = ()=>{
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("auth_token")
  }

  const handleLogin = (usr,token)=>{
      setUser(usr);
      setToken(token);
      setIsLoggedIn(true);
      localStorage.setItem("auth_token",token);
  }

  return (
      <BrowserRouter>
          <WrapperContext.Provider
          value={
              {
                  user,
                  token,
                  isLoggedIn,
                  logout,
              }
          }
          >
              <Switch>
                  <Route exact path="/" render={()=><Redirect to="/signup"/>}/>
                  <Route exact path="/signup" component={Signup}/>
                  <WrapperRoute
                  path = "/signin"
                  render={(props)=><Signin {...props} handleLogin={handleLogin}/>}
                   />
                  <Route exact path="/redirectlogin" component={RedirectLogin}/>
                  <ProtectRoute exact path="/matches" component={Home} />
                  <ProtectRoute exact path="/matches/:id" component={Home} />
                  <ProtectRoute exact path="/logout" component={Logout}/>
              </Switch>

          </WrapperContext.Provider>

      </BrowserRouter>
  )
}
export default App;
