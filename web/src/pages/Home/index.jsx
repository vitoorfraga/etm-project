import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import PageTitle from '../../components/PageTitle';
import ProductCard from '../../components/ProductCard';
import Searchbar from '../../components/Searchbar';
import "./styles.css"

function Home() {

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_token"))

    axios.get(`http://localhost:3000/storage/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res)
      setLoadingData(false)
      setProducts(res.data.products)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
    <Helmet title='Estoque | ETM' />
    <div className="main-grid">
      <Header/>
      <main className='storage-page container'>
        <PageTitle text={`Seus Produtos`} />
        <div className="search-bar">

        </div>

        <div className="search-bar">
          <Searchbar />
        </div>
        <div className="product-list" style={{marginTop: "32px"}}>
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
            />

          );
        })}
        </div>
        {/* <table className='table-products-list'>
          <thead className='table-header'>
            <th>Produto</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Categoria</th>
          </thead>
          
          <tbody>
            {products.map((product) => {
              return(
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

      </main>
    </div>
    </>
  );
}

export default Home;