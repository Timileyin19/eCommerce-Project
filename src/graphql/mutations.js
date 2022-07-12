import { gql } from "@apollo/client";

const ADD_ITEM_TO_CART = gql`
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
