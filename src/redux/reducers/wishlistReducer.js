// src/redux/reducers/wishlistReducer.js

import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
} from "../constants/wishlistConstants";

const initialState = {
  wishlistItems: [],
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;
      const existItem = state.wishlistItems.find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

    case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (x) => x.productId !== action.payload
        ),
      };

    default:
      return state;
  }
};
