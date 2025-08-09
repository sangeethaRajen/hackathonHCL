import { useCart } from "../context/CartContext";


export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
      <img src={product.image} alt={product.title} width={150} />
      <h4>{product.title}</h4>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}
