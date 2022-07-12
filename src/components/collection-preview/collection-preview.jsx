import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';

import { GET_PRODUCTS_FOR_CATEGORY_PREVIEW } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const CollectionPreview = ({ id, name }) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS_FOR_CATEGORY_PREVIEW, { variables: { categoryId: id } });

    return (
        <>
            <div className="collection-preview">
                <h1 className="title">{name.toUpperCase()}</h1>
                {(!loading && !error) ? (
                    <div className="preview">
                        {
                            data?.productsForCategoryPreview?.map((item) => (
                                <CollectionItem key={item.id} item={item} />
                            ))
                        }
                    </div>
                ) : <>
                    {loading ?
                        <p>loading...</p> :
                        <p>Error occurred while loading Date</p>
                    }
                </>
                }
            </div>
        </>
    );
}
export default CollectionPreview;