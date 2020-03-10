import React, { createContext, useReducer } from 'react';

const initialState = {
  hidden: true,
  cartItems: [],
};

const CartContext = createContext({
  cartItems: [],
  addProduct: meadlId => [],
  removeProduct: mealId => [],
});

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(m => m.id !== action.payload),
      };
    default:
      return state;
  }
};

function CartProvider(props) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addProduct(mealId) {
    dispatch({
      type: 'ADD_ITEM',
      payload: mealData,
    });
  }

  function removeProduct(mealId) {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: mealId,
    });
  }

  return (
    <CartContext.Provider
      value={{ cartItems: state.cartItems, addProduct, removeProduct }}
      {...props}
    />
  );
}

export { CartContext, CartProvider };
