import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import './checkout.styles.scss';
import { useNavigate } from 'react-router-dom';
import PaystackCheckout from '../../components/paystack-checkout/paystack-checkout.component';


const CheckoutPage = ({ cartItems, total, currentUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin')
        }
    }, [currentUser])



    const amount = cartItems.reduce(
        (previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
        0
    );

    const checkoutProps = {
        amount,
        user: currentUser
    }

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>{cartItems?.length > 1 ? 'Products' : 'Product'} </span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems?.map(cartItem => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <div className="total">TOTAL:  ₦ {total}</div>
            {currentUser ? <PaystackCheckout {...checkoutProps} /> : <button onClick={() => navigate('/signin')}>Sign-in to Make Payment</button>}

        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(CheckoutPage);