import React from 'react';
import { Button } from 'semantic-ui-react';

function CartDropdown() {
  return (
    <div className='cart-dropdown'>
      <div className='cart-items'></div>
      <Button color='teal' className='button'>
        Go To Cart
      </Button>
    </div>
  );
}

export default CartDropdown;
