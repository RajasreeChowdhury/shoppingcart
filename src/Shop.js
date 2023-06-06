import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext({
  products: [],
  cart: [],
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  incrementQuantity: (id) => {},
  decrementQuantity: (id) => {}
});

export default function ShopProvider({ products: initialProducts, children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);

  const addToCart = (productId) => {
    const product = products.find((item) => item.id === productId);

    if (product.stock === 0) {
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1
        };
        return prevCart.map((item) =>
          item.id === productId ? updatedItem : item
        );
      } else {
        const newItem = {
          ...product,
          quantity: 1
        };
        return [...prevCart, newItem];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, stock: item.stock - 1 } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, stock: item.stock + 1 } : item
      )
    );
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, stock: item.stock - 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((item) =>
        item.id === productId ? { ...item, stock: item.stock + 1 } : item
      )
    );
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  return useContext(ShopContext);
}
