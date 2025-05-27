"use client";

import Link from "next/link";
import Image from "next/image";
import { displayMoney, generateDiscountedPrice } from "../../utils/DisplayMoney";

const ProductCard = ({ product }) => {
  if (!product) {
    return (
      <div className="border border-gray-600 rounded-md p-2 md:p-4 w-full hover:shadow-lg">
        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md">
          <p className="text-gray-500 text-xs md:text-sm">Image not available</p>
        </div>
        <h2 className="mt-2 md:mt-3 text-gray-800 text-sm md:text-base tracking-widest line-clamp-1">
          Product Unavailable
        </h2>
        <div className="mt-1 flex items-center space-x-2">
          <span className="text-xs md:text-sm font-bold tracking-widest text-gray-900">
            ₹0.00
          </span>
        </div>
      </div>
    );
  }

  const hasImagesArray = product.images && product.images.length;
  const hasSingleImage = product.image && typeof product.image === "string";

  const imageUrl = hasImagesArray
    ? product.images[0].url
    : hasSingleImage
    ? product.image
    : "";

  const productId = product._id || product.productId;

  let discountPrice = generateDiscountedPrice(product.price);
  discountPrice = displayMoney(discountPrice);
  const oldPrice = displayMoney(product.price);

  return (
    <div className="border border-gray-300 md:border-gray-600 rounded-md p-2 md:p-4 w-full hover:shadow-lg">
      <Link href={`/product/${productId}`}>
        <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden rounded-md relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name || "Product Image"}
              fill
              sizes="100%"
              className="object-cover object-[45%_35%] rounded-md"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500 text-xs md:text-sm">Image not available</p>
            </div>
          )}
        </div>
      </Link>

      <h2
        className="mt-2 md:mt-3 text-gray-800 text-sm md:text-base tracking-widest line-clamp-1"
        style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}
      >
        {product.name}
      </h2>

      <div className="mt-1 flex items-center space-x-2">
        <span
          className="text-xs md:text-sm font-bold tracking-widest text-gray-900"
          style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}
        >
          {oldPrice}
        </span>
        <span
          className="text-xs md:text-sm text-red-500 tracking-widest line-through"
          style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}
        >
          {discountPrice}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
