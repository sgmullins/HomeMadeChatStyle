import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import CartDropdown from './CartDropdown';
import { AuthContext } from '../context/auth';
import { CartContext } from '../context/shoppingCart';

function TopMenuBar() {
  const context = useContext(AuthContext);
  const {
    state: { cartItems },
  } = useContext(CartContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);
  const [hidden, setHidden] = useState(true);
  console.log('from topmenu', cartItems);

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
    if (name === 'cart') {
      setHidden(!hidden);
    }
    if (name !== 'cart') {
      setHidden(true);
    }
    if (name === 'cart' && hidden === false) {
      setActiveItem(context.user.username);
    }
  };

  const topMenuBar = context.user ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={context.user.username}
        active={activeItem === context.user.username}
        as={Link}
        to='/'
        onClick={handleItemClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          as={Link}
          to='/profile'
          onClick={handleItemClick}
        />
        <Menu.Item name='logout' onClick={context.logout} />
        <Menu.Item
          id='cart-image'
          name='cart'
          active={activeItem === 'cart'}
          onClick={handleItemClick}
        >
          <img src='/food.svg' />
          <span className='item-count'>0</span>
        </Menu.Item>
      </Menu.Menu>
      {hidden ? null : (
        <CartDropdown
          cartItems={cartItems}
          handleItemClick={handleItemClick}
          name='cart'
        />
      )}
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'
        />
      </Menu.Menu>
    </Menu>
  );
  return topMenuBar;
}

export default TopMenuBar;
