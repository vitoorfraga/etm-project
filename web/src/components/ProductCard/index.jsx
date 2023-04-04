import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteProduct } from '../../services/api';
import productPicture from "./../../assets/pictures/product.png"
import { ReactComponent as MoreSvg } from './../../assets/icons/more-vertical.svg';

import './styles.css';
import Button from '../Button';
import { ToastContainer, toast } from 'react-toastify';
import { orderContext } from '../../contexts/OrderContext';

function ProductCard({id ,title, size, price, category, quantity, quantityTotal, addToOrder, inOrder, inView, onClick, ...rest}) {

  const [productOptionVisibility, setProductOptionVisibility] = useState(false)
  const [count, setCount] = useState(1);
  const [quantityMessageAlert, setQuantityMessageAlert] = useState(false)
  
  const { order, setOrder } = useContext(orderContext);

  useEffect(() => {
    if(count == quantity){
      setQuantityMessageAlert(true)
    }
  }, [count])

  const handleProductOptionsVisibility = () => {
    setProductOptionVisibility(!productOptionVisibility)
  }

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
    if(count < quantity){
      setCount(count => count + 1)
    }
  }
  
  const handleDecrement = () => {
    if(count > 1)
    setCount(count - 1)
  }

  const handleAddToOrder = () => {
    console.log(id ,title, price, category, size, count, quantity)
    const dataTemp = order
    const product = {
      id,
      name: title,
      category,
      price,
      count,
      quantityTotal: quantity,
      size
    }

    dataTemp.push(product)
    setOrder(dataTemp)
  }

  const categoriesOptions = [
    {name: "Camisetas" , value: "Camisetas"},
    {name: "Blusinhas" , value: "Blusinhas"},
    {name: "Camisas" , value: "Camisas"},
    {name: "Sueteres e cardigans" , value: "Sueteres e cardigans"},
    {name: "Blazers, jaquetas e casacos" , value: "Blazers, jaquetas e casacos"},
    {name: "Coletes e quimonos" , value: "Coletes e quimonos"},
    {name: "Regatas" , value: "Regatas"},
    {name: "Shorts e bermudas" , value: "Shorts e bermudas"},
    {name: "Calças" , value: "Calças"},
    {name: "Vestidos" , value: "Vestidos"},
    {name: "Saias" , value: "Saias"},
    {name: "Meias-calças" , value: "Meias-calças"},
    {name: "Cachecóis e pashminas" , value: "Cachecóis e pashminas"},
    {name: "Lenços" , value: "Lenços"},
    {name: "Bolsas" , value: "Bolsas"},
    {name: "Meias" , value: "Meias"},
    {name: "Outros" , value: "Outros"},
  ]


  return (

    <div className='product-card'>
      <div className="product-container">
        <div className="product-left">
          <div className="product-image">
            <img src={productPicture} alt="" />
          </div>
        </div>

        <div className="product-right">
          <div className="product-header">
            <span className='product-name'>{title} <span className='product-id'>#{id}</span></span>
            {inOrder &&
            <span className='product-id'>{size}</span>
            }

            {addToOrder &&
            <span className='product-id'>{size}</span>
            }

            
            {inView &&
              <MoreSvg
                className="product-more-options"
                onClick={handleProductOptionsVisibility}
              />

            }

          </div>

          <div className='product-details'>
              <span>{category}</span>
              <span> <span> {price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span></span>

              {inView && 
              <span><span> QTD: {quantity}</span></span>
              }


              {addToOrder &&
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
                    onClick={handleIncrement}>
                      {">"}
                  </button>
                <span> <span style={{fontStyle: "italic"}}>(max: {quantity})</span></span>
              </div>
              }

              {inOrder && 
              <span>Unidades: {quantityTotal}</span>
              }
              
            <div>
            </div>
          </div>

        </div>
      </div>

        <div className="product-footer">
          {addToOrder &&
          <Button 
            text="Adicionar ao pedido"
            onClick={handleAddToOrder}
          />
          }

          {inOrder && 
          <div className="remove">
            <Button 
              text="Remover"
            />
          </div>
          }
        </div>
  
      {productOptionVisibility &&
      <div className="product-option">
        <NavLink to={`product/${id}`}>Editar</NavLink>
        <button onClick={() => handleClickDeleteProduct(id)}>Excluir</button>
      </div>
      
      }

      <ToastContainer />
      </div>
  );
}

export default ProductCard;