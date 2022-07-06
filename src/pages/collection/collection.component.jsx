import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollections } from '../../redux/shop/shop.selectors';
import { CollectionWrapper } from './collection.styles';
import { useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

const CollectionPage = ({ collections }) => {
    const location = useLocation();
    const collectionId = location.pathname.split('/')[location.pathname.split('/').length - 1];

    const { title, items } = collections[collectionId]

    return (
        <CollectionWrapper>
            <div className="collection-page">
                <h2 className="title">{title}</h2>
                <div className="items">
                    {items?.map(item => (
                        <CollectionItem key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </CollectionWrapper>
    );
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollections
})

export default connect(mapStateToProps)(CollectionPage);