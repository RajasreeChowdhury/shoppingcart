import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ShopProvider from "../Shop";
import ProductList from "../Products";
import Cart from "../Cart";

describe("ProductList", () => {
  test("should render product details correctly", () => {
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
    const { container, getByText } = render(
      <ShopProvider products={products}>
        <ProductList />
      </ShopProvider>
    );
    const product1Container = container.querySelector("[data-key=product-1]");
    const product3Container = container.querySelector("[data-key=product-3]");
    expect(
      within(product1Container).getByText("AAA Batteries Set")
    ).toBeInTheDocument();
    expect(
      getByText("A pack of 10 Eveready AAA batteries")
    ).toBeInTheDocument();
    expect(getByText("$10.00")).toBeInTheDocument();
    expect(getByText("Calculator")).toBeInTheDocument();
    expect(
      getByText(
        "Casio DJ-240D Plus 300 Steps Check and Correct Premium Desktop Calculator with Metallic faceplate & Bigger Screen/Keys (14 Digit)"
      )
    ).toBeInTheDocument();
    expect(getByText("$30.00")).toBeInTheDocument();
    const { getByTestId } = within(product1Container);
    expect(getByTestId("add-to-cart")).not.toBeDisabled();
    const { getByTestId: getByTestId3 } = within(product3Container);
    expect(getByTestId3("add-to-cart")).toBeDisabled();
  });

  test("should add product to cart on click of Add To Cart button", () => {
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
    const { container, getByText } = render(
      <ShopProvider products={products}>
        <Cart />
        <ProductList />
      </ShopProvider>
    );

    const product1Container = container.querySelector("[data-key=product-1]");
    const { getByTestId } = within(product1Container);
    fireEvent.click(getByTestId("add-to-cart"));
    fireEvent.click(getByTestId("add-to-cart"));
    expect(getByText("$20.00")).toBeInTheDocument();
    expect(getByText("$18.00")).toBeInTheDocument();
    expect(getByText("$38.00")).toBeInTheDocument();
  });

  test("should disable add to cart button when item is not in stock", () => {
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
        <Cart />
        <ProductList />
      </ShopProvider>
    );

    const product1Container = container.querySelector("[data-key=product-1]");
    const product2Container = container.querySelector("[data-key=product-3]");
    const { getByTestId } = within(product1Container);
    expect(getByTestId("add-to-cart")).toBeEnabled();
    expect(within(product2Container).getByTestId("add-to-cart")).toBeDisabled();
  });
});
