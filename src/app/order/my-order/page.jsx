"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { myOrders, clearErrors, trackOrder } from "@/redux/actions/orderAction";
import { addItemToCart } from "@/redux/actions/cartAction";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import CricketBallLoader from "@/components/Layouts/loader/CricketBallLoader";
import { toast } from "react-toastify";

const MyOrder = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { orders, loading, error } = useSelector((state) => state.myOrder);
  const { user, isAuthenticated } = useSelector((state) => state.userData);
  const { trackingDetails, loading: trackingLoading, error: trackingError } =
    useSelector((state) => state.orderTrack);

  const [trackedOrderId, setTrackedOrderId] = useState(null);

  // Add to Cart Handler
  const addToCartHandler = (id, qty = 1) => {
    dispatch(addItemToCart(id, qty));
    toast.success("Item Added to Cart");
    router.push("/cart");
  };

  // Track Order Handler
  const trackOrderHandler = (orderId) => {
    dispatch(trackOrder(orderId));
    setTrackedOrderId(orderId);
  };

  // View Order Details
  const viewOrderDetailsHandler = (orderId) => {
    router.push(`/orders/${orderId}`);
  };

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      dispatch(myOrders());
    }
  }, [dispatch, error, isAuthenticated, router]);

  useEffect(() => {
    if (trackingError) {
      toast.error(trackingError);
      dispatch(clearErrors());
    }
  }, [dispatch, trackingError]);

  return (
    <>
      <MetaData title="My Orders" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className="container mx-auto mt-20 px-4 py-8 font-[Poppins]">
          <h1 className="text-[32px] font-black uppercase tracking-wide pb-2">
            Orders
          </h1>

          {orders && orders.length > 0 ? (
            orders.map((order) => {
              const mainItem = order.orderItems[0];

              return (
                <div
                  key={order.ID}
                  onClick={isMobile ? () => viewOrderDetailsHandler(order.ID) : undefined}
                  className={`border border-gray-300 rounded-lg p-4 mb-6 flex justify-between items-center ${
                    isMobile ? "cursor-pointer" : ""
                  }`}
                >
                  {/* LEFT SIDE: IMAGE + ORDER INFO */}
                  <div className="flex items-center gap-4">
                    <img
                      src={mainItem?.image}
                      alt={mainItem?.name}
                      className="w-24 h-28 object-cover border border-gray-200"
                    />
                    <div style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}>
                      <h2 className="text-xl font-black uppercase tracking-wide mb-1">
                        {mainItem?.name || "KRIPTEES X BERSERK"}
                      </h2>
                      <p className="hidden md:block text-sm text-gray-500 mb-1">
                        Order ID: {order.ID}
                      </p>
                      <p className="text-sm text-gray-500 mb-2">
                        Size: {mainItem?.size || "L"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-semibold">Quantity</span>
                        <div className="border flex items-center">
                          <span className="px-3 py-1">{mainItem?.quantity || 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: TOTAL + BUTTONS */}
                  <div
                    className="flex flex-col items-end"
                    style={{ fontFamily: "Montserrat", letterSpacing: "0.1rem" }}
                  >
                    <span className="hidden md:block text-lg font-black uppercase mb-2">
                      Total: Rs.{order.totalPrice}
                    </span>
                    <div className="hidden md:flex gap-2">
                      <button
                        onClick={() => viewOrderDetailsHandler(order.ID)}
                        className="border border-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors"
                      >
                        View Details
                      </button>
                    </div>

                    {/* TRACKING INFO */}
                    {trackingDetails && trackedOrderId === order._id && (
                      <div className="mt-4 bg-gray-100 p-4 w-full rounded text-sm text-gray-700">
                        <h3 className="font-bold mb-2">Tracking Information</h3>
                        {trackingDetails.message ? (
                          <p>{trackingDetails.message}</p>
                        ) : trackingDetails.tracking_data?.shipment_track?.[0] ? (
                          <>
                            <p>
                              <strong>Status:</strong>{" "}
                              {trackingDetails.tracking_data.shipment_track[0].current_status}
                            </p>
                            <p>
                              <strong>Estimated Delivery:</strong>{" "}
                              {trackingDetails.tracking_data.shipment_track[0].expected_date}
                            </p>
                            <p>
                              <strong>Last Location:</strong>{" "}
                              {trackingDetails.tracking_data.shipment_track[0].current_location}
                            </p>
                          </>
                        ) : (
                          <p>
                            No tracking information available at this time. Please check back later.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">
              You haven't placed any orders yet.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrder;
