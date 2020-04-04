import React, { createContext, useState, useEffect } from 'react';
import {
  addItemToCart,
  removeItemFromCart,
  getCartItemCount,
  filterItemFromCart,
} from './cart-utils';

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
  clearItemFromCart: () => {},
  cartItemsCount: 0,
});

export const CartProvider = ({ children }) => {
  const persistedCart = JSON.parse(window.localStorage.getItem('cart')) || [];
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState(persistedCart);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const addItem = item => {
    setCartItems(addItemToCart(cartItems, item));
  };
  const removeItem = item => {
    setCartItems(removeItemFromCart(cartItems, item));
  };
  const clearItemFromCart = item =>
    setCartItems(filterItemFromCart(cartItems, item));

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cartItems));
  });
  useEffect(() => {
    setCartItemsCount(getCartItemCount(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        hidden,
        setHidden,
        toggleHidden,
        addItem,
        removeItem,
        cartItems,
        cartItemsCount,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
