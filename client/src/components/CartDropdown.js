import React, { useContext, useState, useReducer } from 'react';
import { Button } from 'semantic-ui-react';
import CartItem from './CartItem';
import { CartContext, cartReducer } from '../context/shoppingCart';

//TODO:Need cart reducer here to access state
function CartDropdown({ cartItems }) {
  // const { cartItems } = useContext(CartContext);
  console.log('from cartDrop', cartItems);

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Button color='teal' className='button'>
        Go To Cart
      </Button>
    </div>
  );
}

export default CartDropdown;
