"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, clearErrors, deleteOrder } from "@/redux/actions/orderAction";
import { toast } from "react-toastify";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import Loader from "@/components/Layouts/loader/CricketBallLoader";
import Sidebar from "@/components/Admin/Sidebar";
import { DELETE_ORDER_RESET } from "@/redux/constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateOrder
  );

  const [toggle, setToggle] = useState(false);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      router.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, router, deleteError]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const rows =
    orders?.map((item) => ({
      id: item._id,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
      status: item.orderStatus,
    })) || [];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL Orders - Admin`} />
          <div className="flex">
            <div>
              <Sidebar />
            </div>

            <div className="bg-gray-200 w-full h-screen">
              <h4 className="m-4 font-semibold text-xl">ALL ORDERS</h4>

              <div className="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Item Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.id}
                        </th>
                        <td className="px-6 py-4">{item.status}</td>
                        <td className="px-6 py-4">{item.itemsQty}</td>
                        <td className="px-6 py-4">₹{item.amount}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/order/${item.id}`}
                            className="mx-1 px-2 py-1 bg-gray-200 rounded-md"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteOrderHandler(item.id)}
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
