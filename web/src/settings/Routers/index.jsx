import React, { useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NewProduct from '../../pages/NewProduct';
import Product from '../../pages/Product';

// import { Container } from './styles';

 function Routers() {

  // const navigate = useNavigate()


  const {authenticated} = useContext(AuthContext);

   const router = createBrowserRouter(
    [
      {
        path:"/",
        element: <Home />,
        
      },

      {
        path:"/new-product",
        element: <NewProduct />
      },
    
    {
      path: "/product/:id",
      element: <Product />  
    },
  
    {
      path: "/login",
      element: <Login />
    }] 
  )


  return (
      <RouterProvider router={router} />
  );
}

export default Routers;