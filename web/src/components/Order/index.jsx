import React, { useContext, useEffect, useState } from 'react'
import "./styles.css"
import Button from '../Button'
import { orderContext } from '../../contexts/OrderContext'
import ProductCard from '../ProductCard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

function Order({status, setStatus, children}) {

  const { order, setOrder } = useContext(orderContext);
  const [ orderTemp, setOrderTemp ] = useState([]);
  // const [ orderAmount, setOrderAmount ] = useState(0);

  let orderAmount = 0

  const notifyOk = () => toast.success("Produto criado com sucesso!");

  const handleClick = () => {
    setStatus(false)
  }

  const sumTotalAmount = order.map(item => {
    orderAmount = orderAmount + (item.price * item.count)
  })

  const handleCreateOrder = () => {
    console.log(order[0])
    const newOrder = {
      "productName": order[0].name,
      "productId": order[0].id,
      // "size": "GG",
      "quantity": order[0].count,
      "amount": order[0].price * order[0].count,
      "category": order[0].category,
      "qtdTotal": order[0].quantityTotal
    }

    console.log(newOrder)

    const token = JSON.parse(localStorage.getItem("user_token"))

    axios.post(`http://localhost:3000/order/new-order`, newOrder, {
      headers: {
        "Authorization": `Bearer ${token}`
      }})
      .then(res => {
        notifyOk()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='order'>
      <div className="order-header">
        <button onClick={handleClick}>X</button>
      </div>

      <div className="finished-order">
        <Button text="Finalizar Pedido" onClick={handleCreateOrder}/>
        <span className='clear-order' onClick={() => setOrder([])}>Limpar Pedido</span>
      </div>

      <div className="order-amount">
        <p> Total: <span>R$ {orderAmount} </span></p>
      </div>


      <div className="order-list-body">
      {order.map((item) => {
        console.log(item)
        return(
          <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            quantity={'asjdiajsi'}
            quantityTotal={item.count}
            category={item.category}
            size={item.size}
            inOrder={true}
          />
        );
      })}
      </div>
      <ToastContainer />
    </div>
  )
}

export default Order