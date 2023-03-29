import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../services/api';
import treeDots from "./../../assets/icons/tree-dots.png"

import camiseta from "./../../assets/categories/camisetas.png"

import './styles.css';

function ProductCard({id ,title, price, category, quantity, order}) {

  const [productOptionVisibility, setProductOptionVisibility] = useState(false)
  const [count, setCount] = useState(1);

  const handleClickDeleteProduct = (id) => {

    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você deseja excluir este produto? Essa ação não pode ser desfeita",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir.',
      cancelButtonText:'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProduct(id)
        window.location.reload()
      }
  })
  }

  const handleIncrement = () => {
    setCount(count + 1)
  }
  
  const handleDecrement = () => {
    if(count > 1)
    setCount(count - 1)
  }

  return (
    order ?  
      <div className='product-card order-card'>
        <div className="product-header">
          <img className='card-categorie-img' src={camiseta} alt="" />
          <span className='product-name'>{title}</span>
            <span className='categorie'>{category}</span>

        </div>
        <div className='product-body'>
            <span>Id: <span>{id}</span></span>
            <span>Preço: <span> {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></span>
            <span>Quantidade: <span>{quantity}</span></span>


            <div className="count">
              <button 
                className="count-button-decrement"
                onClick={handleDecrement}
              >
                {"<"}
              </button>
              <div className="count-value">{count}</div>
              <button 
                className="count-button-increment"
                onClick={handleIncrement}
              >{">"}</button>
          </div>
          <div>
          </div>
        </div>

        <div className="product-footer">
          <button className="add-to-order-button" >Adicionar ao pedido</button>
        </div>
  
      {productOptionVisibility &&
      <div className="product-option">
        <NavLink to={`product/${id}`}>Editar</NavLink>
        <button onClick={() => handleClickDeleteProduct(id)}>Excluir</button>
      </div>
      
      }
      </div>
    
    :

    <div className='product-card'>
        <div className="product-header">
          <span className='product-name'>{title}</span>
          <img src={treeDots} alt="" 
          onClick={() => {
            setProductOptionVisibility(!productOptionVisibility)
          }}
          />
        </div>
        <div className='product-body'>
            <span>Id: <span>{id}</span></span>
            <span>Preço: <span> {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></span>
            <span>Quantidade: <span>{quantity}</span></span>
            <span>Categoria: <span>{category}</span></span>
          <div>
          </div>
        </div>
  
      {productOptionVisibility &&
      <div className="product-option">
        <NavLink to={`product/${id}`}>Editar</NavLink>
        <button onClick={() => handleClickDeleteProduct(id)}>Excluir</button>
      </div>
      
      }
      </div>
  );
}

export default ProductCard;