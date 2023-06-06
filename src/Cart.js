import React from "react";
import { useShopContext } from "./Shop";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity
  } = useShopContext();

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            marginTop: "1em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <div>
            <span>{item.quantity}</span>x<span>{item.name}</span>
          </div>
          <div>
            <button
              onClick={() => {
                if (item.quantity === 1) {
                  removeFromCart(item.id);
                } else {
                  decrementQuantity(item.id);
                }
              }}
              data-testid="decrement"
            >
              -
            </button>{" "}
            <button
              onClick={() => incrementQuantity(item.id)}
              data-testid="increment"
              disabled={item.quantity >= item.stock}
            >
              +
            </button>{" "}
            ${item.price.toFixed(2)}
          </div>
        </div>
      ))}
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <span>Total</span>
        <span>${getTotalPrice().toFixed(2)}</span>
      </div>
      <hr />
    </>
  );
}
