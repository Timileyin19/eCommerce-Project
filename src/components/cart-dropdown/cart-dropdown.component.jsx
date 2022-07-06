import React from 'react';
import { CartDropdownWrapper } from './cart-dropdown.styles'
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { useNavigate } from 'react-router-dom';


const CartDropdown = ({ cartItems, dispatch }) => {
    const navigate = useNavigate();

    return (
        <CartDropdownWrapper>
            <div className="cart-items">
                {
                    cartItems?.length ? (
                        cartItems.map(cartItem => (
                            <CartItem key={cartItem.id} item={cartItem} />
                        ))
                    ) : (
                        <span className="empty-message">Your cart is empty.</span>
                    )
                }
                <CustomButton onClick={() => {
                    navigate('/checkout');
                    dispatch(toggleCartHidden());
                }}>
                    GO TO CHECKOUT
                </CustomButton>
            </div>
        </CartDropdownWrapper>
    )
}
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);