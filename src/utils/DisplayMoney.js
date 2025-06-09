// src/utils/DisplayMoney.js

// Display Money In Indian Format

export const displayMoney = function (num) {
  const numFormat = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const arr = numFormat.format(num).split(".", 1);
  return arr[0];
};

// Calculate Discount Percentage
export const calculateDiscount = (discountedPrice, originalPrice) => {
  const disCountPercent = (discountedPrice / originalPrice) * 100;
  return disCountPercent;
};

// Calculate Total Amount
export const calculateTotal = (arr) => {
  const total = arr.reduce((accum, curr) => accum + curr, 0);
  return total;
};

// Generate Discounted Price (35% markup for display)
export function generateDiscountedPrice(price) {
  var discountPercentage = 35;
  var discountAmount = (discountPercentage / 100) * price;
  var discountedPrice = price + discountAmount;
  return discountedPrice.toFixed(2);
}
