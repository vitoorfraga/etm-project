import axios from "axios";

// => Login
export async function authUser(user, password){
  console.log(user, password)
  const res = await axios.post(`http://localhost:3000/auth/authenticate`, {
    email: user,
    password: password
  })

  return res
}

// Logout