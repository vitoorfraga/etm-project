import React from 'react'
import ReactDOM from 'react-dom/client'
import "./../src/styles/global.css"
import { AuthProvider } from './contexts/auth'
import Routers from './settings/Routers'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Routers />
    </AuthProvider>
  </React.StrictMode>,
)
