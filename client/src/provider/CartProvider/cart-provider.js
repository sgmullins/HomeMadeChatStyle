import React, { createContext, useState, useEffect } from 'react';
import { addItemToCart, removeItemFromCart } from './cart-utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
});

export const CartProvider = ({ children }) => {
  const persistedCart = JSON.parse(window.localStorage.getItem('cart')) || [];
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState(persistedCart);

  const addItem = item => {
    setCartItems(addItemToCart(cartItems, item));
  };
  const removeItem = item => {
    setCartItems(removeItemFromCart(cartItems, item));
  };
  const toggleHidden = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cartItems));
  });

  return (
    <CartContext.Provider
      value={{
        hidden,
        setHidden,
        toggleHidden,
        addItem,
        removeItem,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
