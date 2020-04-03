import React, { useContext } from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { FETCH_MEAL_QUERY } from '../utils/graphqlQueries';
import PopupUtil from '../utils/PopupUtil';
// import { CartContext } from '../context/shoppingCart';
import { CartContext } from '../provider/CartProvider/cart-provider';

function PurchaseMealButton({ mealData }) {
  // const { dispatch } = useContext(CartContext);
  const { addItem } = useContext(CartContext);

  return (
    <>
      <PopupUtil content={'Add Meal to Cart'}>
        <Button
          as='div'
          color='green'
          floated='right'
          onClick={() => addItem(mealData)}
          // onClick={() => dispatch({ type: 'ADD_ITEM', payload: mealData })}
        >
          <Icon name='shopping basket' style={{ margin: 0 }} size='large' />
        </Button>
      </PopupUtil>
    </>
  );
}

export default PurchaseMealButton;
