import React from 'react';
import { NavLink } from 'react-router-dom';
import "./styles.css"

function Header() {

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

        <div className="exit-button">Sair</div>
        </div>
    </header>
  );
}

export default Header;

// {/* <NavLink
//                     to={`contacts/${contact.id}`}
//                     className={({ isActive, isPending }) =>
//                       isActive
//                         ? "active"
//                         : isPending
//                         ? "pending"
//                         : ""
//                     }
//                   >
//                     {/* other code */}
//                   </NavLink> */}