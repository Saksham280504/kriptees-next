"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAdminProducts,
  deleteProduct,
} from "@/redux/actions/productAction";
import { useRouter } from "next/navigation";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import Sidebar from "@/components/Admin/Sidebar";
import Loader from "@/components/Layouts/loader/CricketBallLoader";
import { DELETE_PRODUCT_RESET } from "@/redux/constants/productConstants";
import { toast } from "react-toastify";
import Link from "next/link";

function ProductList() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteUpdateProduct
  );

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
      toast.success("Product Deleted Successfully");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    dispatch(getAdminProducts(token));
  }, [dispatch, error, deleteError, isDeleted]);

  const deleteProductHandler = (id) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    dispatch(deleteProduct(id,token));
  };

  const rows = products?.map((item) => ({
    id: item._id,
    stock: item.Stock,
    price: item.price,
    name: item.name,
  })) || [];

  // Auto-close sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 999 && toggle) {
        setToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ALL PRODUCTS - Admin" />

          <div className="flex">
            <div className="">
              <Sidebar />
            </div>

            <div className="bg-gray-200 w-full h-screen overflow-auto">
              <h4 className="flex m-4 font-semibold text-xl">ALL PRODUCTS</h4>

              <div className="relative overflow-x-auto m-16 rounded-lg shadow-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Product ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Stock</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((item) => (
                      <tr key={item.id} className="bg-white border-b">
                        <th className="px-6 py-4 font-medium text-gray-900">
                          {item.id}
                        </th>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">{item.stock}</td>
                        <td className="px-6 py-4">₹{item.price}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/admin/product/${item.id}`}
                            className="mx-1 px-2 py-1 bg-gray-200 rounded-md"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteProductHandler(item.id)}
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
}

export default ProductList;
