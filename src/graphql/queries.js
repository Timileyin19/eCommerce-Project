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

export const GET_PRODUCTS_FOR_CATEGORY_PREVIEW = gql`
  query getProuctsForCategoryPreview($categoryId: ID!) {
    productsForCategoryPreview(categoryId: $categoryId) {
      name
      price
      id
      imageUrl
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query getproductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      id
      name
      price
      imageUrl
      productCategory {
        name
      }
    }
  }
`;

export const GET_USER_CART = gql`
  query getUserCartItems($userId: String!) {
    userCart(userId: $userId) {
      id
      productId
      quantity
      price
      name
    }
  }
`;
