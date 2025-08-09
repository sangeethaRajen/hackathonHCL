import products from "../data/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import { useState } from "react";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  const filtered = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div>
      <h1 className="text-xl font-bold">🛍️ Product Catalog</h1>
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
