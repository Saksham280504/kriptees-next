"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import CricketBallLoader from "@/components/Layouts/loader/CricketBallLoader";
import { NEW_REVIEW_RESET } from "@/redux/constants/productConstants";
import { clearErrors, newReview } from "@/redux/actions/productAction";

const ReviewCard = ({ product }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.userData);
  const { success, error } = useSelector((state) => state.addNewReview);

  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const dispatch = useDispatch();

  const [sortValue, setSortValue] = useState("highest");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState(0);
  const [recommend, setRecommend] = useState(false);

  const handleSortChange = (event) => setSortValue(event.target.value);

  const handleClickOpen = () => {
    if (!isAuthenticated) {
      toast.error("Please Login to write a review");
      router.push("/login");
    } else {
      setOpen(!open);
    }
  };

  const handleClose = () => setOpen(false);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setComment(e.target.value);
  const handleRatingChange = (value) => setRatings(value);

  const handleSubmit = () => {
    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("comment", comment);
    myForm.set("ratings", ratings);
    myForm.set("recommend", recommend);
    myForm.set("productId", productId);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    dispatch(newReview(myForm));
    toast.success("Review posted successfully");
    handleClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Review posted successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, error, success]);

  if (loading) return <CricketBallLoader />;
  return (
    <div className="m-4">
      <div className="text-2xl text-center font-bold m-8">Users Reviews</div>

      <div
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 lg:mx-96 rounded m-4 items-center align-middle text-center"
        onClick={handleClickOpen}
      >
        Write your Review
      </div>

      {open && (
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Write your review</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Review</label>
                <input
                  type="text"
                  placeholder="Enter title here"
                  value={title}
                  onChange={handleTitleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  placeholder="Enter description here"
                  value={comment}
                  onChange={handleDescriptionChange}
                  rows="4"
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Rating</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((ratingValue) => (
                    <button
                      key={ratingValue}
                      onClick={() => handleRatingChange(ratingValue)}
                      className={`text-2xl ${
                        ratings >= ratingValue ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex overflow-x-scroll hide-scrollbar">
        {product.reviews &&
          product.reviews.map((review, index) => (
            <div key={index} className="m-6 p-6 shadow-lg w-96 rounded-md bg-white">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{review.name}</div>
                <div className="text-gray-500 text-sm">
                  {review.createdAt?.substring(0, 10)}
                </div>
              </div>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((ratingValue) => (
                  <button
                    key={ratingValue}
                    className={`text-2xl ${
                      review.ratings >= ratingValue ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    &#9733;
                  </button>
                ))}
              </div>
              <div className="font-semibold mt-4">{review.title}</div>
              <div className="text-gray-700 mt-2">{review.comment}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReviewCard;