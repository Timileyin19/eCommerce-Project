import React from 'react';
import CollectionPreview from '../collection-preview/collection-preview';
import './collections-overview.styles.scss';

import { GET_PRODUCT_CATEGORIES } from '../../graphql/queries';
import { useQuery } from '@apollo/client';


const CollectionOverview = () => {
    const { loading, error, data } = useQuery(GET_PRODUCT_CATEGORIES);

    if (loading) return <div>loading...</div>
    if (error) return <div>Error encountered while fetching Data. Please Try again. </div>

    return (
        <>
            {!loading && !error && (
                <div className="collections-overview">
                    {data?.productCategories?.map((productCategory) => (
                        <CollectionPreview key={productCategory.id} {...productCategory} />
                    ))}
                </div>
            )}
        </>
    )
}



export default CollectionOverview;