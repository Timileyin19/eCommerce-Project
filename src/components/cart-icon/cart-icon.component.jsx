import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as Cart } from '../../assets/cart.svg';
import { CartIconWrapper } from './cart-icon.styles';

const CartIcon = ({ toggleCartHidden }) => (
    <CartIconWrapper onClick={toggleCartHidden}>
        <Cart className='shopping-icon' />
        <span className='item-count'>0</span>
    </CartIconWrapper>
)

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);
