import React from 'react'
import "./styles.css"

function Order({status, setStatus}) {

  const handleClick = () => {
    setStatus(false)
  }

  return (
    <div className='order'>
      <div className="order-header">
        <button onClick={handleClick}>X</button>
      </div>
    </div>
  )
}

export default Order