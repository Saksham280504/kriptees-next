'use client';

import axios from 'axios';
import { ADD_TO_WISHLIST, REMOVE_WISHLIST_ITEM } from '@/constants/wishlistConstants';

// Add to Wishlist
export const addItemToWishlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://kriptees-backend-ays7.onrender.com/api/v1/product/${id}`);

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      productId: data.Product._id,
      name: data.Product.name,
      price: data.Product.price,
      image: data.Product.images[0].url,
      stock: data.Product.Stock,
    },
  });

  // Save wishlist data to localStorage (only on client)
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
  }
};

// Remove item from Wishlist
export const removeItemFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  // Save wishlist data to localStorage (only on client)
  if (typeof window !== 'undefined') {
    localStorage.setItem('wishlistItems', JSON.stringify(getState().wishlist.wishlistItems));
  }
};
