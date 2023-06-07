import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Order from '../../components/Order';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import Searchbar from '../../components/Searchbar';

import { ReactComponent as BagSvg } from './../../assets/icons/shopping-bag.svg';

import { orderContext } from '../../contexts/OrderContext';
import OrderItem from '../../components/OrderItem';

import styles from './ViewOrder.module.css'

function ViewOrder() {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [loadingData, setLoadingData] = useState(true)
  const [orderVisibility, setOrderVisibility] = useState(false)
  const [orders, setOrders] = useState([])
  const [noOrders, setNoOrders] = useState(false)

  const {order, setOrder} = useContext(orderContext)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_token"))

    axios.get(`http://localhost:3000/order/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data.orders.length)
      if(res.data.orders.length === 0) {
        setNoOrders(true)
      }
      setLoadingData(false)
      setOrders(res.data.orders)
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

  const renderOrderList = orders.map(((item) => {
    if(item.quantity >= 1 ) {
      return(
        <OrderItem
          key={item.id}
          id={item.id}
          amount={item.amount}
          date={item.createdAt}
          quantity={item.quantity}
        />
  
      );
    }
  }))

  return (
    <>
    <Helmet title='Pedidos | ETM' />
    <div className="main-grid">
      <Header/>
      <main className='order-page container'>
        <PageTitle text={`Pedidos`} />
        <div className="search-bar">

        </div>
        <div className="search-bar">
          {/* <Searchbar /> */}
        </div>
        <div className="product-list order-list" style={{marginTop: "32px"}}>
        {loadingData && <p>Carregando seus produtos 🌼</p>}
        
        {renderOrderList}
        </div>

        {noOrders && <p style={{fontSize: '1.6rem'}}>Você ainda não realizou nenhum pedido.</p>}


      </main>
    </div>
    </>
  );
}

export default ViewOrder;