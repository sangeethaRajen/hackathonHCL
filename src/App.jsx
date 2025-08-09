import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartSummary from "./components/CartSummary";
import { CartProvider } from "./context/CartContext";
import './index.css';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <header className="header-bar">
          <div className="header-left">🛍️ MyShop</div>
          <nav className="nav">
            <Link to="/catalog">Catalog</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <main className="p-6">
          <Routes>
            <Route path="/catalog" element={<ProductList />} />
            <Route path="/cart" element={<CartSummary />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}
