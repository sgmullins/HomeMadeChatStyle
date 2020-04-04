import React, { useContext } from 'react';
import { CartContext } from '../provider/CartProvider/cart-provider';
import { CheckOutItem } from '../components/CheckOutItem';

function Checkout() {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div>
      {cartItems.map(cartItem => (
        <CheckOutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      checkout
    </div>
  );
}

export default Checkout;
