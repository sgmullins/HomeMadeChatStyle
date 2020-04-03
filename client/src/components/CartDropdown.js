import React, { useContext, useState, useReducer } from 'react';
import { Button } from 'semantic-ui-react';
import CartItem from './CartItem';
import { Link, withRouter } from 'react-router-dom';
import { CartContext } from '../provider/CartProvider/cart-provider';
//TODO:Need cart reducer here to access state
function CartDropdown({ history }) {
  const { cartItems, toggleHidden } = useContext(CartContext);
  console.log('from cartDrop', cartItems);
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Button
        color='teal'
        className='button'
        onClick={() => {
          history.push('/checkout');
          toggleHidden();
        }}
      >
        Go To Cart
      </Button>
    </div>
  );
}

export default withRouter(CartDropdown);
