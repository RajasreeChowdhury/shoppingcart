import "./styles.css";
import React from "react";
import Cart from "./Cart";
import ProductList from "./Products";
import ShopProvider from "./Shop";

const products = [
  {
    id: 1,
    name: "AAA Batteries Set",
    description: "A pack of 10 Eveready AAA batteries",
    price: 10,
    stock: 2
  },
  {
    id: 2,
    name: "Stapler",
    description: "Desktop Stapler, Full-Strip, 20 Sheet Capacity - Black",
    price: 20,
    stock: 4
  },
  {
    id: 3,
    name: "Calculator",
    description:
      "Casio DJ-240D Plus 300 Steps Check and Correct Premium Desktop Calculator with Metallic faceplate & Bigger Screen/Keys (14 Digit)",
    price: 30,
    stock: 0
  },
  {
    id: 4,
    name: "Table Lamp",
    description:
      "9W, Dimming Halo Rechargeable Table Lamp, 3 Colors (Cool Day Light, Neutral White and Warm White)",
    price: 18,
    stock: 1
  },
  {
    id: 5,
    name: "Extension Cord",
    description:
      "Hoteon Extension Cords with USB Solts, 3 USB Ports 3 Way Outlets Power Strips with USB Surge Protection",
    price: 23,
    stock: 1
  }
];

// Usage
export default function App() {
  return (
    <ShopProvider products={products}>
      <h2>Cart</h2>
      <div style={{ padding: "0px 20px" }}>
        <Cart />
      </div>
      <h2>Products</h2>
      <ProductList />
    </ShopProvider>
  );
}
