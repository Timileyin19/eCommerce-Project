import { gql } from "@apollo/client";

export const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
    productCategories {
      id
      name
      routeName
      imageUrl
      size
    }
  }
`;
