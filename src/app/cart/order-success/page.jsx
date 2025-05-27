"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function OrderSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentMethod = typeof window !== "undefined" ? localStorage.getItem("paymentMethod") : null;

  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orderId && paymentMethod === "ONLINE") {
      fetchPaymentDetails(orderId);
    } else if (paymentMethod === "COD") {
      setLoading(false);
    } else {
      setError("No order ID or payment method found.");
      setLoading(false);
    }
  }, [orderId, paymentMethod]);

  const fetchPaymentDetails = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:5000/api/v1/payment/check`,
        { orderId },
        config
      );

      if (response.data) {
        setPaymentDetails(response.data);
        updatePaymentInfo(response.data);
      } else {
        setError("No payment details found.");
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
      setError("Failed to fetch payment details.");
    } finally {
      setLoading(false);
    }
  };

  const updatePaymentInfo = async (paymentDetails) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      };

      const paymentInfo = {
        id: paymentDetails[0].cf_payment_id,
        status: paymentDetails[0].payment_status,
      };

      await axios.put(
        `http://localhost:5000/api/v1/order/updatePaymentInfo/${orderId}`,
        { paymentInfo },
        config
      );

      console.log("Payment info updated successfully");
    } catch (error) {
      console.error("Error updating payment info:", error);
      setError("Failed to update payment info.");
    }
  };

  return (
    <div className="bg-white mt-16" style={{ fontFamily: "Montserrat", letterSpacing: "0.12rem" }}>
      <div className="bg-white p-6 mt-34 md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            {paymentMethod === "COD" ? "Order Confirmed!" : "Payment Done!"}
          </h3>
          <p className="text-gray-600 my-2">
            {paymentMethod === "COD"
              ? "Thank you for placing your order. Your order will be delivered soon."
              : "Thank you for completing your secure online payment."}
          </p>

          {loading && <p className="text-gray-600">Loading payment details...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {paymentMethod === "ONLINE" && paymentDetails.length > 0 && (
            <div className="my-4">
              <p className="text-gray-600">Order ID: {paymentDetails[0].order_id}</p>
              <p className="text-gray-600">Payment Status: {paymentDetails[0].payment_status}</p>
              <p className="text-gray-600">Amount Paid: ₹{paymentDetails[0].payment_amount}</p>
            </div>
          )}

          {paymentMethod === "COD" && (
            <div className="my-4">
              <p className="text-gray-600">Order ID: {orderId}</p>
              <p className="text-gray-600">Payment Method: Cash on Delivery</p>
            </div>
          )}

          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <button
              onClick={() => router.push("/orders")}
              className="px-12 bg-black hover:bg-gray-500 text-white font-semibold py-3"
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
