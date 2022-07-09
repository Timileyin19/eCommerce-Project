import React from 'react';
import { PaystackButton } from 'react-paystack';
import './paystack-checkout.styles.scss';

const PaystackCheckout = ({ amount, user }) => {
    const publicKey = 'pk_test_cad80db5737eaf2e2b665acd3fb534b43310730b';
    const PaystackButtonProps = {
        email: user?.email,
        amount: amount * 100,
        metadata: {
            name: user?.displayName,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () =>
            alert("Your payment has been received. Thank you for doing business with us!!!"),
        // Clear Cart
        // goto the homepage
        onClose: () => alert("Wait! You need this product, don't go!!!!"),
    }
    return (
        <PaystackButton className="paystack-btn" {...PaystackButtonProps} />
    )
}

export default PaystackCheckout;