import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { CheckoutpageWrapper } from './checkout.styles'
import { useNavigate } from 'react-router-dom';
import PaystackCheckout from '../../components/paystack-checkout/paystack-checkout.component';



const CheckoutPage = ({ cartItems, total, currentUser }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/signin')
        }
    }, [currentUser, navigate])



    const amount = cartItems.reduce(
        (previousValue, currentValue) => previousValue + (currentValue.price * currentValue.quantity),
        0
    );

    const checkoutProps = {
        amount,
        user: currentUser
    }

    return (
        <CheckoutpageWrapper>
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
            {cartItems?.length > 0 ? <PaystackCheckout {...checkoutProps} /> : <button onClick={() => navigate('/shop')}>Populate Cart With Products</button>}

        </CheckoutpageWrapper>
    )
}


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(CheckoutPage);