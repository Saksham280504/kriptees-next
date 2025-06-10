'use client';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import Sidebar from "@/components/Admin/Sidebar";
import Loader from "@/components/Layouts/loader/CricketBallLoader";
import { getAllUsers, clearErrors, deleteUser } from "@/redux/actions/userAction";
import { DELETE_USER_RESET } from "@/redux/constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted, message } = useSelector(
    (state) => state.profileData
  );

  const [toggle, setToggle] = useState(false);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

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
      toast.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message]);

  const rows = users?.map((item) => ({
    id: item._id,
    role: item.role,
    email: item.email,
    name: item.name,
  })) || [];

  // Auto-close sidebar on larger screens
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
          <MetaData title="ALL Users - Admin" />
          <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex-1 p-6">
              <h4 className="text-xl font-bold mb-4">ALL USERS</h4>

              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Role</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {rows.map((item) => (
                      <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.id}
                        </td>
                        <td className="px-6 py-4">{item.name}</td>
                        <td className="px-6 py-4">{item.email}</td>
                        <td className="px-6 py-4">{item.role}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteUserHandler(item.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
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

export default UserList;
