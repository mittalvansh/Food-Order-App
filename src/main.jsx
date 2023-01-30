import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CartProvider from './components/Hooks/CartProvider'
import { AuthContextProvider } from './components/Hooks/Auth-Context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthContextProvider>
)
