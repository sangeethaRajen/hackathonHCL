// src/pages/CartPage.jsx
import { useCart } from "../context/CartContext";

export default function CartSummary() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Cart Summary</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                <div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p>${item.price} × {item.quantity}</p>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove item"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <strong>Total: ₹{total.toFixed(2)}</strong>
      </div>
    </div>
  );
}
