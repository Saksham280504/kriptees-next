'use client';

import { useState, useEffect } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { createOrder } from "@/redux/actions/orderAction";

export default function PaymentPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const quickBuyItem = searchParams.get("quickBuy")
    ? JSON.parse(searchParams.get("quickBuy"))
    : null;

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  let orderItems = [];
  if (quickBuyItem) {
    const item = {
      productId: quickBuyItem.product || quickBuyItem.id,
      name: quickBuyItem.name,
      price: quickBuyItem.price,
      quantity: quickBuyItem.quantity || 1,
      image: quickBuyItem.image,
      size: quickBuyItem.size || "M",
    };
    orderItems = [item];
  } else {
    orderItems = cartItems;
  }

  const subTotal = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const deliveryCharges = 90;
  const grandTotal = subTotal + deliveryCharges;

  let orderCounter = 0;
  function generateOrderId() {
    const currentDate = new Date();
    const orderDateTimeSeconds = Math.floor(currentDate.getTime() / 1000);
    orderCounter = (orderCounter + 1) % 1000;
    return `order_${orderDateTimeSeconds}_${orderCounter}`;
  }

  const createOrderInDatabase = async (order) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    const normalizedOrder = {
      ...order,
      orderItems: order.orderItems.map((item) => ({
        ...item,
        product: item.productId || item.product,
        productId: item.productId || item.product,
      })),
    };

    await axios.post(
      `https://kriptees-backend-ays7.onrender.com/api/v1/order/new`,
      normalizedOrder,
      config
    );
  };

  const handleSelectionChange = (e) => {
    const selected = e.target.value;
    setPaymentMethod(selected);
    localStorage.setItem("paymentMethod", selected);

    if (selected === "COD") {
      setShowConfirmation(true);
      setShowPayButton(false);
    } else {
      setShowConfirmation(false);
      setShowPayButton(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const orderId = generateOrderId();
      const order = {
        shippingInfo,
        orderItems,
        itemsPrice: subTotal,
        shippingPrice: deliveryCharges,
        totalPrice: grandTotal,
        paymentInfo: {
          id: "Cash On Delivery",
          status: "COD",
        },
        ID: orderId,
      };
      await createOrderInDatabase(order);
      dispatch(createOrder(order));
      toast.success("Order Confirmed!");
      router.push(`/success?orderId=${encodeURIComponent(orderId)}`);
    } catch (error) {
      toast.error("Failed to create order!");
    }
  };

  const doPayment = async () => {
    const cashfree = await load({ mode: "production" });
    try {
      const orderId = generateOrderId();
      const order = {
        shippingInfo,
        orderItems,
        itemsPrice: subTotal,
        shippingPrice: deliveryCharges,
        totalPrice: grandTotal,
        paymentInfo: { id: "pending", status: "pending" },
        ID: orderId,
      };

      await createOrderInDatabase(order);

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };

      const { data } = await axios.post(
        `https://kriptees-backend-ays7.onrender.com/api/v1/payment/createOrder`,
        {
          ...order,
          order_meta: {
            return_url: `https://kriptees.com/success?orderId=${encodeURIComponent(orderId)}`,
            notify_url: "https://www.cashfree.com/devstudio/preview/pg/webhooks/24210234",
            payment_methods: "cc,dc,upi",
          },
        },
        config
      );

      await cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (error) {
      toast.error("Payment process failed");
    }
  };

  return (
    <div className="mt-8 md:mt-12 px-4">
      <div className="max-w-6xl mx-auto rounded-lg p-8 shadow-sm bg-white">
        <h2 className="font-black text-3xl md:text-[44px] leading-[30px] md:leading-[40px] uppercase py-5 text-center md:text-left">
          Order Summary
        </h2>

        {/* You can now reuse the JSX for rendering order items, totals, and buttons */}
        {/* ...Keep all existing JSX as is from original Payment.jsx */}

        {/* Example Button Section */}
        {showConfirmation && (
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded-lg w-full mt-4"
          >
            Confirm Order
          </button>
        )}

        {showPayButton && (
          <button
            onClick={doPayment}
            className="bg-black text-white px-4 py-2 rounded-lg w-full mt-4"
          >
            Pay Online
          </button>
        )}
      </div>
    </div>
  );
}
