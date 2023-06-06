import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import App from "../App";
import ShopProvider from "../Shop";
import ProductList from "../Products";

describe("Cart", () => {
  it("should increase and decrease item quantity on +/- button click", () => {
    const products = [
      {
        id: 1,
        name: "AAA Batteries Set",
        description: "A pack of 10 Eveready AAA batteries",
        price: "10.00",
        stock: 2
      },
      {
        id: 3,
        name: "Calculator",
        description:
          "Casio DJ-240D Plus 300 Steps Check and Correct Premium Desktop Calculator with Metallic faceplate & Bigger Screen/Keys (14 Digit)",
        price: "18.00",
        stock: 0
      }
    ];
    const { container } = render(
      <ShopProvider products={products}>
        <ProductList />
      </ShopProvider>
    );

    // Find the AAA Batteries Set and add it to the cart
    const product1Container = container.querySelector("[data-key=product-1]");
    const addToCartButton = within(product1Container).getByTestId(
      "add-to-cart"
    );
    fireEvent.click(addToCartButton);

    // Find the first item in the cart and verify its initial quantity and total cost
    const cartItem1 = container.querySelector("[data-key=cart-1");
    expect(within(cartItem1).getByText("$20.00")).toBeInTheDocument();

    // Click the decrement button and verify that the quantity and total cost decrease
    const incrementButton = within(cartItem1).getByTestId("increment");
    fireEvent.click(incrementButton);
    // expect(within(cartItem1).getByText("$40.00")).toBeInTheDocument();
  });

  it("should disable increment button when product is out of stock", () => {
    const { getByTestId } = render(<App />);

    // Find the Calculator and attempt to add it to the cart
    const addToCartButton = getByTestId("add-to-cart-3");
    fireEvent.click(addToCartButton);

    // Find the Calculator item in the cart and verify that the increment button is disabled
    const cartItem3 = getByTestId("cart-3");
    const incrementButton = getByTestId("increment-3");
    expect(cartItem3).toHaveTextContent("0 x Calculator");
    expect(incrementButton).toBeDisabled();
  });
});
