import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = React.createContext();

export function AuthProvider ({children}) {


  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem("user_token");
    
    if(!!token){
      // window.location.href = "/login"
    }
    else{
      null
    }
  }, [])

  async function handleLogin(user, password){
    try{
      const res = await axios.post("http://localhost:3000/auth/authenticate", {
        email: user,
        password: password
      })


      const token = res.data.token;

      window.localStorage.setItem("user_token", JSON.stringify(token));
      axios.defaults.headers = token;

      return res
    }
    catch(error) {
      return error
    }

  }

  async function handleLogout(){
    localStorage.removeItem("user_token")
  }

  return(
    <AuthContext.Provider value={{authenticated, handleLogin, handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}