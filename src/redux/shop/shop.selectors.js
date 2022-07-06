import React from "react";
import { createSelector } from "reselect";
import { useLocation } from "react-router-dom";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((key) => collections[key])
);

export const selectCollection = () => {
  const location = useLocation();
  return createSelector(
    [selectCollections],
    (collections) =>
      collections[
        location.pathname.split("/")[location.pathname.split("/").length - 1]
      ]
  );
};
