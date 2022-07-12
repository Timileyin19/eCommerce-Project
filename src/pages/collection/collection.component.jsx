import React from 'react';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { CollectionWrapper } from './collection.styles';
import { useLocation } from 'react-router-dom';

import { GET_PRODUCTS_BY_CATEGORY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const CollectionPage = () => {
    const location = useLocation();
    const collectionId = location.pathname.split('/')[location.pathname.split('/').length - 1];

    const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATEGORY, { variables: { categoryId: collectionId } });

    if (loading) return <p>loading...</p>
    if (error && !loading) return <p>Error encountered when trying to fetch data. Please try again.</p>

    return (
        <CollectionWrapper>
            <div className="collection-page">
                {!loading && !error && (
                    <>
                        <h2 className="title">
                            {
                                data?.productsByCategory[0]?.productCategory?.name
                            }
                        </h2>
                        <div className="items">
                            {data?.productsByCategory?.map(item => (
                                <CollectionItem key={item.id} item={item} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </CollectionWrapper>
    );
}



export default CollectionPage;