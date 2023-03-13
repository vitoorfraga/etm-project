import { useState } from "react"
import { redirect } from "react-router-dom";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  if(!authenticated){
    return redirect("/login")
  }
}