import React, { createContext, useEffect, useState } from 'react'

// => Create New Context
export const orderContext = createContext()


// Create new provider Component
export const GlobalOrder = ({ children }) => {

  const [order, setOrder] = useState([])

  return (
    <orderContext.Provider value={{ order, setOrder}}>
      {children}
    </orderContext.Provider>
  )
}