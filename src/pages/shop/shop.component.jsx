import React, { useState } from 'react'
import SHOP_DATA from '../../redux/shop/shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview';
import { Route, useLocation } from 'react-router-dom';


const ShopPage = () => {
    const location = useLocation();
    return (
        <div className="shop-page">

            {/* {productCollections.map(({ id, ...otherProductCollectionsProps }) => (
                <CollectionPreview key={id} {...otherProductCollectionsProps} />
            ))} */}
        </div>
    )

}
export default ShopPage;