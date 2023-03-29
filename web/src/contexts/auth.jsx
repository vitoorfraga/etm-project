import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";

export const AuthContext = React.createContext();

export function AuthProvider ({children}) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);


  async function handleLogin(user, password){

    try{
      const res = await axios.post("http://localhost:3000/auth/authenticate", {
        email: user,
        password: password
      })

      const token = res.data.token;

      window.localStorage.setItem("user_token", JSON.stringify(token));
      axios.defaults.headers = token;

      return window.location.href = "/"
    }
    catch(error) {
      return error
    }

  }

  async function handleRegister(email, name, lastname, password){

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email: email,
        firstName: name,
        lastName: lastname,
        password: password
      })

      window.location = "/login"
      return res
    }

    catch(error) {
    }

    }

  async function handleLogout(){
    localStorage.removeItem("user_token")
  }

  return(
    <AuthContext.Provider value={{handleLogin, handleRegister, handleLogout}}>
        {children}
    </AuthContext.Provider>
  )
}