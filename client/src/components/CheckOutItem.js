import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider/cart-provider';

export const CheckOutItem = ({ cartItem }) => {
  const { title, quantity } = cartItem;
  const { addItem, clearItemFromCart, removeItem } = useContext(CartContext);
  return (
    <div className='checkout-item'>
      <span className='title'>{title}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => removeItem(cartItem)}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => addItem(cartItem)}>
          &#10095;
        </div>
      </span>
      <div
        className='remove-button'
        onClick={() => clearItemFromCart(cartItem)}
      >
        &#10005;
      </div>
    </div>
  );
};
