import React from 'react';

const CartItem = ({ item: { id, title, quantity } }) => (
  <div className='cart-item'>
    <img src='https://i.ibb.co/ZYW3VTp/brown-brim.png' alt='item' />
    <div className='item-details'>
      <span className='name'>{title}</span>
      <span className='price'>{quantity} x $9.99</span>
    </div>
  </div>
);

export default CartItem;
