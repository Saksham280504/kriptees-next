'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trackOrder, clearErrors } from '@/redux/actions/orderAction';
import MetaData from '@/components/Layouts/MetaData/MetaData';
import CricketBallLoader from '@/components/Layouts/loader/CricketBallLoader';
import { toast } from 'react-toastify';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const {
    trackingDetails,
    loading: trackingLoading,
    error: trackingError,
  } = useSelector((state) => state.orderTrack);

  const { user, isAuthenticated } = useSelector((state) => state.userData);

  useEffect(() => {
    if (trackingError) {
      toast.error(trackingError);
      dispatch(clearErrors());
    }
    if (id) dispatch(trackOrder(id));
  }, [dispatch, id, trackingError]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <MetaData title="Order Details" />
      {trackingLoading ? (
        <CricketBallLoader />
      ) : (
        <div className="container mx-auto mt-16 px-4 py-8 font-[Poppins] text-gray-800">
          {trackingDetails && trackingDetails.orderDetails ? (
            <div
              className="max-w-6xl mx-auto"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.1rem' }}
            >
              {/* Order Summary */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-extrabold uppercase tracking-wide mb-4">
                  Order Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order ID:</span>{' '}
                      {trackingDetails.orderDetails.ID}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order Date:</span>{' '}
                      {new Date(
                        trackingDetails.orderDetails.createdAt
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Order Total:</span>{' '}
                      ₹{trackingDetails.orderDetails.totalPrice}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Payment Info:</span>{' '}
                      {trackingDetails.orderDetails.paymentInfo.id}
                    </p>
                    <p className="text-sm font-semibold uppercase">Shipping Address:</p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.firstName}{' '}
                      {trackingDetails.orderDetails.shippingInfo.lastName}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.address}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.city},{' '}
                      {trackingDetails.orderDetails.shippingInfo.state} -{' '}
                      {trackingDetails.orderDetails.shippingInfo.pinCode}
                    </p>
                    <p className="text-sm">
                      {trackingDetails.orderDetails.shippingInfo.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Order Items
                </h2>
                {trackingDetails.orderDetails.orderItems.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-row items-start gap-4 mb-6 border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
                    onClick={
                      isMobile
                        ? () => router.push(`/product/${product.productId}`)
                        : undefined
                    }
                  >
                    <Link href={`/product/${product.productId}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded border border-gray-300"
                      />
                    </Link>
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm text-gray-600">Price: ₹{product.price}</p>
                      <p className="text-sm text-gray-600">Seller: Kriptees</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Info */}
              <div className="border border-gray-300 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold uppercase tracking-wide mb-4">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Delivery Status:</span>{' '}
                      {trackingDetails.orderDetails.orderStatus}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold uppercase">Delivery Date:</span>{' '}
                      7 Jan 2025
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold uppercase">Tracking Information:</p>
                    {trackingDetails.message ? (
                      <p className="text-sm">{trackingDetails.message}</p>
                    ) : trackingDetails.tracking_data?.shipment_track?.[0] ? (
                      <>
                        <p className="text-sm">
                          <span className="font-semibold">Status:</span>{' '}
                          {
                            trackingDetails.tracking_data.shipment_track[0]
                              .current_status
                          }
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Estimated Delivery:</span>{' '}
                          {
                            trackingDetails.tracking_data.shipment_track[0]
                              .expected_date
                          }
                        </p>
                        <p className="text-sm">
                          <span className="font-semibold">Last Location:</span>{' '}
                          {
                            trackingDetails.tracking_data.shipment_track[0]
                              .current_location
                          }
                        </p>
                      </>
                    ) : (
                      <p className="text-sm">
                        No tracking information available at this time. Please check back
                        later.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                {['Download Invoice', 'Buy Again', 'Track Package', 'Return Items'].map(
                  (text) => (
                    <button
                      key={text}
                      className="border border-black text-black px-4 py-2 uppercase text-sm font-medium hover:bg-black hover:text-white transition-colors"
                    >
                      {text}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">No order details available.</p>
          )}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
