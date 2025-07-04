import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_FAIL,
} from "@/redux/constants/productConstants";

// get ALL Products
export const getProduct = (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0
) => {
  return async (dispatch) => {
    try {
      // initial state :
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });

      let link = `https://kriptees-backend-ays7.onrender.com/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // when category selected by user then using another link
      if (category) {
        link = `https://kriptees-backend-ays7.onrender.com/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&category=${category}`;
      }
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
        totalProducts: data.totalProducts,
        filterdProductCount : data.filterdProductCount,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
};

// Get Products Details
export const getProductDetails = (id) => {
  console.log("Error Id: ", id);
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const { data } = await axios.get(`https://kriptees-backend-ays7.onrender.com/api/v1/product/${id}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data.Product,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
};

//Add new Review
export const newReview = (reviewData, token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,

      }
    };

    const { data } = await axios.put(`https://kriptees-backend-ays7.onrender.com/api/v1/review/new`, reviewData, config);


    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.message });
  }
};

// admin product request :
export const getAdminProducts = (token) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      }
    };

    const { data } = await axios.get("https://kriptees-backend-ays7.onrender.com/api/v1/admin/products", config);


    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message });
  }
};

// Create Product
export function createProduct(productData,token) {
  return async function (dispatch) {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      });
       const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        }
      };

      const { data } = await axios.post(
        `https://kriptees-backend-ays7.onrender.com/api/v1/admin/product/new`,

        productData,
        config
      );

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };
}

// Delete Product request

export function deleteProduct(id,token) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        }
      };

      const { data } = await axios.delete(`https://kriptees-backend-ays7.onrender.com/api/v1/admin/product/${id}`, config);


      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
    }
  };
}

// updateProduct;
export const updateProduct = (id, productData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });
    console.log(productData)
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `https://kriptees-backend-ays7.onrender.com/api/v1/admin/product/${id}`,

      productData,
      config
    );

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message,
    });
  }
};

// get all review of product admin ==>
export const getAllreviews = (productId) => async (dispatch) => {

  try {
    dispatch({ type: ALL_REVIEW_REQUEST })

    const { data } = await axios.get(`https://kriptees-backend-ays7.onrender.com/api/v1/reviews?id=${productId}`);

    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews })
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.message })
  }
}


// delete product review
export const deleteProductReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST })

    const { data } = await axios.delete(
      `https://kriptees-backend-ays7.onrender.com/api/v1/product/reviews/delete?id=${reviewId}&productId=${productId}`

    );

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.message })
  }

}


// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
