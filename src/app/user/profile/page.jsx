'use client';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  logout,
  updatePassword,
  updateProfile,
  load_UserProfile,
  forgetPassword,
  clearErrors,
} from "@/actions/userAction";
import {
  UPDATE_PASSWORD_RESET,
  UPDATE_PROFILE_RESET,
} from "@/constants/userConstant";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, isAuthenticated } = useSelector((state) => state.userData);
  const { loading, isUpdated, error } = useSelector((state) => state.profileData);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [toggle, setToggle] = useState(false);

  // Password states
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch({ type: UPDATE_PROFILE_RESET }); // redundant double reset retained from original
      router.push("/account");
      dispatch(load_UserProfile());
    }
  }, [dispatch, error, user, isUpdated, router]);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [router, isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      router.push("/account");
    }
  }, [dispatch, error, isUpdated, loading, router]);

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsValidEmail(newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsValidName(e.target.value.length >= 4);
  };

  const UpdateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  const handleOldPassword = (e) => setOldPassword(e.target.value);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsValidPassword(e.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
    setIsValidConfirmPassword(e.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  const updatePasswordSubmitHandler = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  const logoutHandler = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", user.email);
    dispatch(forgetPassword(myForm));
  };

  const isSignInDisabledProfile = !(email && isValidEmail && name && isValidName);
  const isSignInDisabled = !(newPassword && confirmPassword && oldPassword && isValidPassword);

  return (
    <div className="mt-16 lg:mt-16 mx-4 xl:mx-auto max-w-screen-xl min-h-screen">
      <div className="py-4">
        <h1 className="text-[1.4rem] md:text-4xl font-black uppercase tracking-widest py-2 mx-4 md:m-2  md:py-4">
          Account Settings
        </h1>
      </div>
      <hr className="mb-1" />

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* User Details Card */}
        <div className="bg-white shadow rounded-lg p-6 flex-1">
          <p className="text-xl font-semibold ">User Details</p>
          <div className="space-y-2">
            <p className="text-gray-600">Name: {user.name}</p>
            <p className="text-gray-600">Phone Number: Coming Soon</p>
            <p className="text-gray-600">Email: {user.email}</p>
          </div>
          <button
            onClick={() => setToggle(!toggle)}
            className="mt-4 inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
          >
            Change
          </button>

          {toggle && (
            <div className="mt-6 border-t border-gray-300 pt-4">
              <p className="text-xl font-semibold mb-4">Update User Details</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={handleNameChange}
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full rounded-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  disabled={isSignInDisabledProfile}
                  onClick={UpdateProfileSubmitHandler}
                  className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-white disabled:bg-gray-500 hover:bg-gray-800 transition-colors"
                >
                  Update Profile
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Password Update Card */}
        <div className="bg-white shadow rounded-lg p-6 flex-1">
          <p className="text-xl font-semibold mb-4">Password</p>
          <form onSubmit={updatePasswordSubmitHandler}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <label className="block">
                <span className="text-sm text-gray-500">Current Password</span>
                <input
                  value={oldPassword}
                  onChange={handleOldPassword}
                  type="password"
                  placeholder="***********"
                  className="mt-1 w-full rounded-md px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-500">New Password</span>
                <input
                  value={newPassword}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder="***********"
                  className="mt-1 w-full rounded-md px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-500">Confirm New Password</span>
                <input
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  placeholder="***********"
                  className="mt-1 w-full rounded-md px-3 py-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </label>
            </div>
            <button
              disabled={isSignInDisabled}
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:bg-gray-500 hover:bg-gray-800 transition-colors"
            >
              Save Password
            </button>
          </form>
        </div>
      </div>

      {/* Logout Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 text-center">
        <button
          onClick={logoutHandler}
          className="w-full rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
