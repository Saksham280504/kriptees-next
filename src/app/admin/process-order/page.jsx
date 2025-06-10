'use client';

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "@/redux/actions/orderAction";
import Sidebar from "@/components/Admin/Sidebar";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import Loader from "@/components/Layouts/loader/CricketBallLoader";
import { toast } from 'react-toastify';
import { UPDATE_ORDER_RESET } from "@/redux/constants/orderConstants";
import Link from "next/link";
import { useParams } from "next/navigation";

const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const dispatch = useDispatch();
  const params = useParams();
  const productId = params.id;

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(productId));
  }, [dispatch, error, isUpdated, updateError, productId]);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(productId, myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className="flex">
            <Sidebar />
            <div className="bg-gray-100 p-8 w-full">
              <div className="mx-auto bg-white shadow-lg rounded-lg p-6">
                <h5 className="text-2xl font-semibold mb-4">USER ORDER DETAILS</h5>
                <div>OrderID: {order._id}</div>
                <div>Date: {order.createdAt}</div>

                {order.orderItems && order.orderItems.map((item, idx) => (
                  <Link
                    href={`/product/${item.productId}`}
                    key={idx}
                    className="block mb-4 hover:bg-gray-100 p-4 rounded transition duration-300"
                  >
                    <div>
                      <img src={item.image} width={100} alt={item.name} />
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                      <div>X{item.quantity}</div>
                      <div>{item._id}</div>
                    </div>
                  </Link>
                ))}

                <div className="mt-8">
                  <div className="text-xl font-semibold mb-2">DELIVERY ADDRESS</div>
                  <div className="bg-gray-50 p-4 rounded shadow-sm">
                    <div className="font-medium text-lg">
                      {order.user && order.user.name}
                    </div>
                    <div className="mt-2">
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </div>
                    <div className="mt-2">{order.shippingInfo?.phoneNo}</div>
                    <div className="mt-2">{order.user?.email}</div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Total Price</h4>
                    <p className="text-gray-600">(Inclusive of all taxes)</p>
                  </div>
                  <p className="text-2xl font-bold mt-2">₹{order.totalPrice}</p>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Order Status</h4>
                    <p className="text-lg font-bold">{order.orderStatus}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold">Payment Status</h4>
                    <p className="text-lg font-bold">
                      {order.paymentInfo?.status}
                    </p>
                  </div>
                </div>

                {order.orderStatus && (
                  <div className="mt-8 bg-gray-50 p-6 rounded shadow-sm">
                    <form onSubmit={updateOrderSubmitHandler}>
                      <h1 className="text-2xl font-semibold mb-4">Process Order</h1>
                      <div className="mb-4">
                        <select
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded"
                        >
                          <option value="">Choose Category</option>
                          {order.orderStatus === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={loading || status === ""}
                        className={`w-full py-2 rounded text-white ${loading || status === "" ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 transition duration-300'}`}
                      >
                        Process
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
