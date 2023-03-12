import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "./../src/styles/global.css"
import Home from './pages/Home'
import NewProduct from './pages/NewProduct'
import Product from './pages/Product'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Home />,
    children: [

    ]
  },
  {
    path:"/new-product",
    element: <NewProduct />
  },
  
  {
    path: "/product/:id",
    element: <Product />  
  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
