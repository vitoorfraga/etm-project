import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from '../../contexts/auth';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import NewOrder from '../../pages/NewOrder';
import NewProduct from '../../pages/NewProduct';
import Product from '../../pages/Product';
import SignUp from '../../pages/SignUp';

// import { Container } from './styles';

 function Routers({isAuthenticated}) {


   const router = createBrowserRouter(
    [
      {
        path:"/",
        element:  <Home />,
      },

      {
        path:"/new-product",
        element:  <NewProduct /> 
      },
    
      {
        path: "/product/:id",
        element:   <Product /> 
      },

      {
        path: "new-order",
        element: <NewOrder />
      },
  
      {
        path: "/login",
        element: <Login />
      },
  
      {
        path: "/register",
        element: <SignUp />
      }
    ] 
  )


  return (
      <RouterProvider router={router} />
  );
}

export default Routers;