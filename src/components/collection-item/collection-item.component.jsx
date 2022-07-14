import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { useQuery, useMutation } from '@apollo/client';
import { GET_USER_CART } from '../../graphql/queries';
import { ADD_ITEM_TO_CART, UPDATE_CART_ITEM } from '../../graphql/mutations';


const CollectionItem = ({ item }) => {
    const { id, name, price, imageUrl } = item;

    const { error, data: cartItems } = useQuery(GET_USER_CART,
        { variables: { userId: localStorage.getItem('userId') } });

    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART, {
        refetchQueries: [{ query: GET_USER_CART }]
    })

    const [updateCartItem] = useMutation(UPDATE_CART_ITEM);


    if (error) return <p>An Error occured while fetching User's cart. Please try again.</p>



    const handleAddToItemToCart = () => {
        const exisitingItem = cartItems?.userCart?.filter(item =>
            item.productId === id
        );

        if (exisitingItem?.length > 0) {
            const query_variables = { cartId: exisitingItem[0].id, quantity: exisitingItem[0].quantity };
            updateCartItem({
                variables: query_variables
            })
        } else {
            const queryVariable = { productId: id, userId: localStorage.getItem('userId'), name, imageUrl, price };
            addItemToCart({
                variables: queryVariable
            });
        }
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
                    onClick={() => handleAddToItemToCart()}
                    inverted>
                    Add to cart
                </CustomButton>
            </div>
        </>


    )
}




export default CollectionItem;