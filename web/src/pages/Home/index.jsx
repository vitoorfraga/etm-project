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
  const [searchString, setSearchString] = useState("");
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_token"))

    axios.get(`http://localhost:3000/storage/`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(res => {
      setLoadingData(false)
      setProducts(res.data.products)
    })
    .catch(err => {
    })
  }, [])

  useEffect(() => {
    console.log(searchString)
    let dataTemp = products.filter((item) => {
      const formatSearchString = searchString.toLocaleLowerCase()
      console.log(formatSearchString)
      const formatItemName = item.name.toLocaleLowerCase().replaceAll('-', ' ')
      console.log(formatItemName)
      if (formatItemName.includes(formatSearchString)) {
        console.log(item)
        return item
      }
    })

    setFilterProducts(dataTemp)
  }, [searchString])

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
          <Searchbar 
            value={searchString}
            setValue={setSearchString}
          />
        </div>
        <div className="product-list" style={{marginTop: "32px"}}>
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
              inView
              />
  
            );
          })

          : 
        
          filterProducts.map((item) => {
            console.log('dasdasd')
            if(item.quantity >= 1) {
              return (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  category={item.category}
                  inView
                />
              )
            }
          })
        }

        {/* {filterProducts.length >= 1 &&
          filterProducts.map((item) => {
            return (
              <ProductCard
              key={item.id}
              id={item.id}
              title={item.name}
              price={item.price}
              quantity={item.quantity}
              category={item.category}
              inView
              />
            )
          })
        }
        {
        products.map((item) => {
          return(
            <ProductCard
            key={item.id}
            id={item.id}
            title={item.name}
            price={item.price}
            quantity={item.quantity}
            category={item.category}
            inView
            />

          );
        })
        } */}

        </div>
        {products.length === 0 && <p style={{background: "#e9e9e9", fontSize: "1.4rem", width: "fit-content", padding: "8px"}}>Você ainda não possui produtos cadastrados 🤔.</p>}


      </main>
    </div>
    </>
  );
}

export default Home;