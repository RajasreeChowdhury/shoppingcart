import React from "react";
import { useShopContext } from "./Shop";

export default function ProductList() {
  const { products, addToCart } = useShopContext();

  return (
    <div className="container">
      {products.map((product) => (
        <div className="card content" key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>
            {`$ ${product.price}`}{" "}
            <button
              onClick={() => addToCart(product.id)}
              data-testid="add-to-cart"
              disabled={product.stock <= 0}
            >
              Add To Cart
            </button>
          </p>
        </div>
      ))}
    </div>
  );
}
