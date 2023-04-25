import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Order from '../../components/Order';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import Searchbar from '../../components/Searchbar';

import { ReactComponent as BagSvg } from './../../assets/icons/shopping-bag.svg';

import "./styles.css"
import { orderContext } from '../../contexts/OrderContext';

function NewOrder() {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loadingData, setLoadingData] = useState(true)
  const [orderVisibility, setOrderVisibility] = useState(false)

  const {order, setOrder} = useContext(orderContext)

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

  // => Filtrar Produtos
  useEffect(() => {
    let dataTemp = products.filter((item) => {
      const formatSearchString = searchString.toLocaleLowerCase()
      const formatItemName = item.name.toLocaleLowerCase().replaceAll('-', ' ')
      if (formatItemName.includes(formatSearchString)) {
        console.log(item)
        return item
      }
    })

    setFilterProducts(dataTemp)
  }, [searchString])

  const handleClick = () => {
    setOrderVisibility(true)
  }

  const addToOrder = (product) => {
    console.log(product)
  }

  return (
    <>
    <Helmet title='Novo Pedido | ETM' />
    <button onClick={() => console.log(order)}>Teste hehe</button>
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

        {
          searchString == "" ? 
          products.map((item) => {
            return(
              <ProductCard
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              quantity={item.quantity}
              category={item.category}
              addToOrder={true}
              />
  
            );
          })

          : 
        
          filterProducts.map((item) => {
            return (
              <ProductCard
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              quantity={item.quantity}
              category={item.category}
              addToOrder={true}
              />
            )
          })
        }
        
        </div>

        <button onClick={handleClick} className='open-order-button'><BagSvg /></button>

        {orderVisibility &&
          <div className="new-order-container">
            <Order 
              status={orderVisibility} 
              setStatus={setOrderVisibility}
            >   
            </Order>
          </div>
        }
      </main>
    </div>
    </>
  );
}

export default NewOrder;