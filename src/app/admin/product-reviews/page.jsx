"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllreviews,
  clearErrors,
  deleteProductReview,
} from "@/redux/actions/productAction";
import Loader from "@/components/Layouts/loader/CricketBallLoader";
import Sidebar from "@/components/Admin/Sidebar";
import { DELETE_REVIEW_RESET } from "@/redux/constants/productConstants";
import Head from "next/head";

export default function ProductReviews() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [productId, setProductId] = useState("");

  const { error, reviews, loading } = useSelector(
    (state) => state.getAllReview
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllreviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Review Deleted Successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteProductReview(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllreviews(productId));
  };

  const rows = reviews?.map((item) => ({
    id: item._id,
    user: item.name,
    comment: item.comment,
    rating: item.ratings,
    recommend: item.recommend ? "Yes" : "No",
  })) || [];

  return (
    <>
      <Head>
        <title>All Reviews</title>
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar />

          <div className="w-full flex-col justify-center">
            <div className="m-16">
              <form onSubmit={productReviewsSubmitHandler}>
                <div className="flex flex-col m-4 font-semibold text-xl">
                  All Reviews
                </div>

                <div>Enter Product ID:</div>

                <input
                  required
                  className="rounded-md m-2"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />

                <button
                  className="rounded-md bg-blue-400 hover:bg-blue-500 p-2 text-white font-semibold w-24 self-center"
                  type="submit"
                  disabled={loading || productId === ""}
                >
                  Search
                </button>
              </form>

              {reviews && reviews.length > 0 ? (
                <div className="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                  <h4>Product Reviews:</h4>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-6 py-3">Product ID</th>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Comment</th>
                        <th className="px-6 py-3">Recommend</th>
                        <th className="px-6 py-3">Rating</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((item) => (
                        <tr
                          key={item.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {item.id}
                          </th>
                          <td className="px-6 py-4">{item.user}</td>
                          <td className="px-6 py-4">{item.comment}</td>
                          <td className="px-6 py-4">{item.recommend}</td>
                          <td className="px-6 py-4">{item.rating}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => deleteReviewHandler(item.id)}
                              className="mx-1 px-2 py-1 bg-red-500 text-white rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1 className="m-8 text-center text-xl">No Reviews Found</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
