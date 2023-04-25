import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import "./styles.css"

function Header({user}) {

  const navigate = useNavigate();
  const {handleLogout, setAuthenticated} = useContext(AuthContext);

  function handleClick() {
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
              <small>Produtos</small>
              <NavLink to="/">Estoque</NavLink>
              <NavLink to="/new-product">Adicionar Produto</NavLink>
              <small>Estoque</small>
              <NavLink to="/new-order">Novo Pedido</NavLink>
            </nav>

        <div onClick={handleClick} className="exit-button">Sair</div>
        </div>
    </header>
  );
}

export default Header;