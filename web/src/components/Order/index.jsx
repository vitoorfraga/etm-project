import React, { useContext, useEffect, useState } from 'react'
import "./styles.css"
import Button from '../Button'
import { orderContext } from '../../contexts/OrderContext'
import ProductCard from '../ProductCard'

function Order({status, setStatus, children}) {

  const { order, setOrder } = useContext(orderContext);
  const [ orderTemp, setOrderTemp ] = useState([]);
  // const [ orderAmount, setOrderAmount ] = useState(0);

  let orderAmount = 0

  const handleClick = () => {
    setStatus(false)
  }

  const sumTotalAmount = order.map(item => {
    console.log(item.price)
    orderAmount = orderAmount + (item.price * item.count)
  })

  return (
    <div className='order'>
      <div className="order-header">
        <button onClick={handleClick}>X</button>
      </div>

      <div className="finished-order">
        <Button text="Finalizar Pedido"/>
      </div>

      <div className="order-amount">
        <p> Total: <span>R$ {orderAmount} </span></p>
      </div>

      <button onClick={() => console.log(orderAmount)}>Teste</button>

      <div className="order-list-body">
      {order.map((item) => {
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
    </div>
  )
}

export default Order