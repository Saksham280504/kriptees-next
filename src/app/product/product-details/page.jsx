"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "@/actions/productAction";
import { addItemToCart } from "@/actions/cartAction";
import { addItemToWishlist, removeItemFromWishlist } from "@/actions/wishlistAction";
import { PRODUCT_DETAILS_RESET } from "@/constants/productsConstants";
import ReviewCard from "@/components/ReviewCard";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import CricketBallLoader from "@/components/Layouts/loader/Loader";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [i, setI] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("S");
  const [touchStartX, setTouchStartX] = useState(null);

  const { product, loading, error, success } = useSelector((state) => state.productDetails);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const isInWishlist = wishlistItems?.some((item) => item.productId === id);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      dispatch({ type: PRODUCT_DETAILS_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, success]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setPreviewImg(product.images[0].url);
      setI(0);
    }
  }, [product]);

  const handlePreviewImg = (index) => {
    setPreviewImg(product.images[index].url);
    setI(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (diffX > 50 && i > 0) {
      const newIndex = i - 1;
      setI(newIndex);
      setPreviewImg(product.images[newIndex].url);
    } else if (diffX < -50 && i < product.images.length - 1) {
      const newIndex = i + 1;
      setI(newIndex);
      setPreviewImg(product.images[newIndex].url);
    }
    setTouchStartX(null);
  };

  const increaseQuantityHandler = () => {
    if (product.Stock && quantity >= product.Stock) return;
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantityHandler = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddItem = () => {
    dispatch(addItemToCart(id, quantity, size));
    toast.success("Item Added To Cart");
  };

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(id));
      toast.success("Item removed from Wishlist");
    } else {
      dispatch(addItemToWishlist(id));
      toast.success("Item Added To Wishlist");
    }
  };

  const convertToPoints = (text) => {
    if (text && typeof text === "string") {
      return text.split(". ").map((s) => s.trim()).filter((s) => s.length > 0);
    }
    return [];
  };

  const points = convertToPoints(product?.description);

  const checkoutHandler = () => {
    router.push(`/shipping?quickBuy=${JSON.stringify({
      id,
      quantity,
      size,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || "",
    })}`);
  };

  if (loading || !product) return <CricketBallLoader />;

  return (
    <>
      <MetaData title={product.name || "Product Details"} />
      <div className="bg-white dark:bg-gray-800 py-10 mt-4 md:mt-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* LEFT COLUMN: Images */}
            <div className="md:w-1/2">
              <div className="flex flex-col-reverse md:flex-row gap-4">
                <div className="flex md:flex-col gap-3 md:mt-0 md:w-1/5 p-1 overflow-x-auto md:overflow-x-hidden">
                  {product.images?.map((img, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer min-w-20 md:w-full rounded-lg ${
                        index === i
                          ? "ring-2 ring-black ring-offset-2 ring-offset-white"
                          : ""
                      }`}
                      onClick={() => handlePreviewImg(index)}
                    >
                      <img
                        src={img.url}
                        alt={`Preview ${index}`}
                        className="w-20 h-[6.8rem] md:w-full md:h-36 object-cover object-[45%_35%] rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="md:w-4/5"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <img
                    src={previewImg}
                    alt="Main"
                    className="w-full md:aspect-[3/4] object-cover object-[45%_35%] rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Product Info */}
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                {product.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2" style={{ fontFamily: "Montserrat" }}>
                {product.info}
              </p>
              <div className="mb-4">
                <span className="text-xl font-bold">Rs.{product.price}</span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through ml-2">Rs.{product.oldPrice}</span>
                )}
              </div>

              {/* Size Options */}
              <div className="mb-6">
                <h3 className="font-bold mb-2 uppercase text-sm">Size</h3>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSize(option)}
                      className={`w-12 h-12 border ${
                        size === option
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-gray-300 hover:border-black"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="font-bold mb-2 uppercase text-sm">Quantity</h3>
                <div className="flex border border-gray-300 w-32">
                  <button onClick={decreaseQuantityHandler} className="w-10 h-10 border-r">
                    -
                  </button>
                  <div className="flex-1 h-10 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button onClick={increaseQuantityHandler} className="w-10 h-10 border-l">
                    +
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddItem}
                  className="bg-white border border-gray-300 py-3 uppercase tracking-wider hover:border-black w-full"
                >
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className="px-4 py-2 bg-white border border-gray-300"
                >
                  {isInWishlist ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-md font-bold uppercase mb-2">Description</h3>
                <ul className="list-disc ml-5 text-sm">
                  {points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Review Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-10">
              <h3 className="text-lg font-bold mb-4">Reviews</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
