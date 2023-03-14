import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../services/api';
import treeDots from "./../../assets/icons/tree-dots.png"

import './styles.css';

function ProductCard({id ,title, price, category, quantity}) {

  const [productOptionVisibility, setProductOptionVisibility] = useState(false)


  const handleClickDeleteProduct = (id) => {
    console.log("Clicou em excluir produto")
    console.log(id)

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

  return (
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
          <span>Preço: <span> R${`${price}`}</span></span>
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