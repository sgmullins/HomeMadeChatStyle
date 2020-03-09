import React from 'react';
import { Icon, Button } from 'semantic-ui-react';

import PopupUtil from '../utils/PopupUtil';

function PurchaseMealButton({ mealId, callback }) {
  return (
    <>
      <PopupUtil content={'Add Meal to Cart'}>
        <Button as='div' color='green' floated='right'>
          <Icon name='shopping basket' style={{ margin: 0 }} size='large' />
        </Button>
      </PopupUtil>
    </>
  );
}

export default PurchaseMealButton;
