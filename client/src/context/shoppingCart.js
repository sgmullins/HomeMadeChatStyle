import React, { createContext, useReducer } from 'react';

const initialState = {
  hidden: true,
  cartItems: [],
};

export const CartContext = createContext({
  cartItems: [],
  addProduct: meadlId => [],
  removeProduct: mealId => [],
});

const addItemsToCart = (cartItems, cartItemToAdd) => {
  console.log(
    'from shopping cart util additem line 15',
    cartItems,
    cartItemToAdd,
  );
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id,
  );
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  //no existing item, add item to cart and attach new quantity property to it
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        cartItems: addItemsToCart(state.cartItems, action.payload),
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

// function CartProvider(props) {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   function addProduct(mealId) {
//     console.log('addproduct dispatch');
//     dispatch({
//       type: 'ADD_ITEM',
//       payload: mealId,
//     });
//   }

//   function removeProduct(mealId) {
//     dispatch({
//       type: 'REMOVE_ITEM',
//       payload: mealId,
//     });
//   }

//   return (
//     <CartContext.Provider
//       value={{ cartItems: state.cartItems, addProduct, removeProduct }}
//       {...props}
//     />
//   );
// }

// export { CartContext, CartProvider };
