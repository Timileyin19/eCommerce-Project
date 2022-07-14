import { gql } from "@apollo/client";

export const ADD_ITEM_TO_CART = gql`
  mutation addItemtoCart(
    $productId: String!
    $userId: String!
    $name: String!
    $imageUrl: String!
    $price: Int!
  ) {
    addItemtoCart(
      productId: $productId
      userId: $userId
      name: $name
      imageUrl: $imageUrl
      price: $price
    ) {
      id
      quantity
      price
      userId
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation updateCartItem($cartId: ID!, $quantity: Int!) {
    updateCartItem(cartId: $cartId, quantity: $quantity) {
      id
      quantity
      price
      userId
    }
  }
`;
