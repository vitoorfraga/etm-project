import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NewProductForm from '../../components/forms/NewProductForm';
import Header from '../../components/Header';
import PageTitle from '../../components/PageTitle';

import './styles.css';

function NewProduct() {

  return (
    <>
    <Helmet title='Novo Produto | ETM' />
    
    <div className="main-grid">
      <Header/>
      <main className='container'>

          <PageTitle text={`Novo produto`} />
          <div className="form-container">
            <NewProductForm />
          </div>
      </main>
    </div>
    </>
  );
}
  
export default NewProduct;