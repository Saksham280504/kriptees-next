"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

function Sidebar() {
  const { user, loading } = useSelector((state) => state.userData);
  const router = useRouter();

  const accountHandler = () => {
    router.push("/account");
  };

  return (
    <>
      {!loading && (
        <div className="shadow-xl p-4 space-y-8 h-screen">
          <div className="bg-gray-500 rounded-lg text-white p-4">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>

          <ul className="space-y-2">
            <li>
              <Link
                href="/admin/dashboard"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/admin/products"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/admin/newproduct"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Add Product
              </Link>
            </li>

            <li>
              <Link
                href="/admin/orders"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Orders
              </Link>
            </li>

            <li>
              <Link
                href="/admin/reviews"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Reviews
              </Link>
            </li>

            <li>
              <Link
                href="/ContactUs"
                className="block bg-sky-400 p-2 rounded-md hover:bg-sky-500 font-semibold text-white"
              >
                Contact
              </Link>
            </li>
          </ul>

          <button
            className="bg-blue-400 w-full p-2 rounded-md text-white mt-4"
            onClick={accountHandler}
          >
            Account
          </button>
        </div>
      )}
    </>
  );
}

export default Sidebar;
