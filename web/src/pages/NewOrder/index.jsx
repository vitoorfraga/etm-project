import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Order from '../../components/Order';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import Searchbar from '../../components/Searchbar';

import { ReactComponent as BagSvg } from './../../assets/icons/shopping-bag.svg';


import "./styles.css"

function NewOrder() {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true)

  const [orderVisibility, setOrderVisibility] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_token"))

    axios.get(`http://localhost:3000/storage/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res)
      console.log(res.data.products.length)
      setLoadingData(false)
      setProducts(res.data.products)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const handleClick = () => {
    setOrderVisibility(true)
  }

  return (
    <>
    <Helmet title='Novo Pedido | ETM' />
    <div className="main-grid">
      <Header/>
      <main className='order-page container'>
        <PageTitle text={`Novo Pedido`} />
        <div className="search-bar">

        </div>

        <div className="search-bar">
          <Searchbar />
        </div>
        <div className="product-list order-list" style={{marginTop: "32px"}}>
        {loadingData && <p>Carregando seus produtos 🌼</p>}

        {products.map((item) => {
          return(
            <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            quantity={item.quantity}
            category={item.category}
            order={true}
            />
          );
        })}
        
        </div>
        {products.length === 0 && <p style={{background: "#e9e9e9", fontSize: "1.4rem", width: "fit-content", padding: "8px"}}>Você ainda não possui produtos cadastrados 🤔.</p>}

        <button onClick={handleClick} className='open-order-button'><BagSvg /></button>

        {orderVisibility &&
          <div className="new-order-container">
            <Order 
              status={orderVisibility} 
              setStatus={setOrderVisibility}
            />
          </div>
        }
      </main>
    </div>
    </>
  );
}

export default NewOrder;