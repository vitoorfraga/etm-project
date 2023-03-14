import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageTitle from '../../components/PageTitle';
import { AuthContext } from '../../contexts/auth';
import { authUser } from '../../services/auth';
import screenImage from "./../../assets/pictures/login-background.jpg";

import './styles.css';

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)

  const {authenticated, handleLogin, setAuthenticated} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userValidation = user.includes("@") && user.includes(".com")
    const passwordValidation = password.length >= 6;
    if(!userValidation){
      setError("Preencha o e-mail corretamente.")
    }
    else if(!passwordValidation){
      setError("Sua senha deve ter no mínimo 6 caracteres.");
    }
    else{
      try {
        const res = await handleLogin(user, password)
        console.log('entrou aqui')
        navigate("/login")
      }
      catch(error){
        setError(error)
        console.log(error)
      }
    }
  }

  return (
    <div className='auth-screen'>

      <section className='auth-content'>
        <PageTitle text={`Faça login para entrar`}/>
        <form className='form-login' onSubmit={(e) => handleSubmit(e)}>
          <Input
          label={`E-mail:`}
          value={user}
          setValue={setUser}
          placeholder={`Insira seu e-mail`}
          />
          <Input 
          label={`Senha:`}
          type={`password`}
          value={password}
          setValue={setPassword}
          placeholder={`Insira sua senha`}
          />
          {error && <span className='error-message'>{error}</span>}
          <Button text={`Entrar`}/>

          <span>Não possui conta? <NavLink to={`/register`}>Registre-se</NavLink>.</span>
        </form>
      </section>

      <div className="background-image">
        <img src={screenImage} alt="" />
      </div>
    </div>
  );
}

export default Login;