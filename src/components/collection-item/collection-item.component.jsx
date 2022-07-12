import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from '../../redux/user/user.selectors';



import { addItem } from '../../redux/cart/cart.actions';

import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../../graphql/queries';


const CollectionItem = ({ currentUser, item, addItem }) => {
    const { id, name, price, imageUrl } = item;

    const { loading, error, data: cartItems, refetch } = useQuery(GET_USER_CART,
        { variables: { userId: currentUser?.email } });



    const handleAddToItemToCart = (productId) => {
        const exisitingItem = cartItems?.userCart?.filter(item => item.productId === productId);

        if (exisitingItem?.length > 0) {
            // update the quantity
        } else {
            // add new cart
        }



        // product exist in user cart ? update : add
    }

    return (
        <>
            <div className="collection-item">
                <div
                    className='image'
                    style={{
                        backgroundImage: `url(${imageUrl})`
                    }}
                />
                <div className="collection-footer">
                    <span className='name'>{name}</span>
                    <span className='price'>{price}</span>
                </div>
                <CustomButton
                    // onClick={() => addItem(item)} 
                    onClick={() => handleAddToItemToCart(id)}
                    inverted>
                    Add to cart
                </CustomButton>
            </div>
        </>


    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);