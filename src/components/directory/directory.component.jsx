import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

import { GET_PRODUCT_CATEGORIES } from '../../graphql/queries';
import { useQuery } from '@apollo/client';

const Directory = () => {

  const { loading, error, data } = useQuery(GET_PRODUCT_CATEGORIES);

  if (loading) return <div>loading...</div>
  if (error) return <div>Error encountered while fetching Data. Please Try again. </div>



  return (
    <>
      {!loading && !error && (
        <div className="directory-menu">
          {data.productCategories.map(({ id, ...otherSectionProps }) => (
            <MenuItem key={id} {...otherSectionProps} />
          ))}
        </div>

      )}
    </>
  );
}


export default Directory;