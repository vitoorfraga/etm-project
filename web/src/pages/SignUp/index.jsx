import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PageTitle from '../../components/PageTitle';
import { AuthContext } from '../../contexts/auth';
import screenImage from "./../../assets/pictures/register-background.jpg";


function SignUp() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("")

  const [error, setError] = useState(false)

  const {authenticated, handleRegister, setAuthenticated} = useContext(AuthContext);

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
        const res = await handleRegister(user, name, lastName, password)
        console.log(res)
        // navigate("/login")
      }
      catch(error){
        setError(error)
        console.log(error)
      }
    }
  }

  return (
    <div className='auth-screen'>

      <section className='auth-content' id='register'>
        <PageTitle text={`Registre-se`}/>
        <form className='form-login' onSubmit={(e) => handleSubmit(e)}>
          <Input
          label={`E-mail:`}
          value={user}
          setValue={setUser}
          placeholder={`Insira seu e-mail`}
          />

          <Input
          label={`Nome:`}
          value={name}
          setValue={setName}
          placeholder={`Insira seu nome`}
          />

          <Input
          label={`Sobrenome:`}
          value={lastName}
          setValue={setLastName}
          placeholder={`Insira seu sobrenome`}
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

          <span>Já possui conta? <NavLink to={`/login`}>Entre</NavLink>.</span>
        </form>
      </section>

      <div className="background-image">
        <img src={screenImage} alt="" />
      </div>
    </div>
  );
}

export default SignUp;