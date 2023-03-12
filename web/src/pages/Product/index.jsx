import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, useParams } from 'react-router-dom';
import EditProductForm from '../../components/forms/EditProductForm';
import NewProductForm from '../../components/forms/NewProductForm';
import Header from '../../components/Header';
import PageTitle from '../../components/PageTitle';

import arrowIcon from "./../../assets/icons/arrow.png"

import "./styles.css"

function Product() {

const {id} = useParams();

  return (
    <>
    <Helmet title='Editar produto | ETM' />
    
    <div className="main-grid">
      <Header/>
      
      <main className='container'>

          <PageTitle text={`Editar Produto`} />
          <div className="form-container">

            <NavLink to={"/"} className='return-alert'>
              <img src={arrowIcon}/>
              <span>Retornar ao estoque</span>
            </NavLink>

          <EditProductForm id={id}/>
          </div>
      </main>
    </div>
    </>
  );
}

export default Product;