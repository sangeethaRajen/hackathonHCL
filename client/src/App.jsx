import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import ProductList from './components/ProductList';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';

import './App.css'

function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <header className="header-bar">
            <div className="header-left">🛍️ MyShop</div>
            <nav className="nav">
              <Link to="/catalog">Catalog</Link>
              <Link to="/cart">Cart</Link>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/catalog" element={<ProductList />} />
            <Route path="/cart" element={<CartSummary />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  )
}

export default App;
