import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import "./styles.css"

function Header() {

  const navigate = useNavigate();
  const {handleLogout} = useContext(AuthContext);

  function handleClick() {
    console.log('clicou')
    handleLogout();
    return navigate("/login")
  }

  return (
    <header>
        <div className="container">

          <div className="user">
            <div className='user-icon'>VF</div>
            <span className='name'>Vitor Fraga</span>
          </div>

            <nav className='sidebar-menu'>
              <NavLink to={"/"}>Estoque</NavLink>
              <NavLink to={"/new-product"}>Adicionar Produto</NavLink>
            </nav>

        <div onClick={handleClick} className="exit-button">Sair</div>
        </div>
    </header>
  );
}

export default Header;