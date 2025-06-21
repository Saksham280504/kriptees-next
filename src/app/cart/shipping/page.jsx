'use client';

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "@/redux/actions/cartAction";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";

const Shipping = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname(); // used if you need current path, can be removed if unused
  
  const quickBuy = useSelector(s => s.cart.quickBuy);
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [firstName, setFirstName] = useState(shippingInfo.firstName || "");
  const [lastName, setLastName] = useState(shippingInfo.lastName || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "India");
  const [phoneNo, setPhone] = useState(shippingInfo.phoneNo || "");
  const [email, setEmail] = useState(shippingInfo.email || "");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPhoneNoValid, setIsPhoneNoValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !email || !firstName || !lastName || !address || !city ||
      !state || !country || !pinCode || !phoneNo
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (phoneNo && phoneNo.length !== 10) {
      toast.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        email,
        firstName,
        lastName,
      })
    );

    router.push('/cart/payment'); // Next.js navigation
  };

  return (
    <>
      <MetaData title={"Shipping Info"} />
      <div className="Home_Page min-h-screen mt-4 md:mt-8">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-black uppercase tracking-widest mb-8 text-center">
            Shipping Info
          </h2>

          <div
            className="bg-white border border-gray-300 rounded shadow-lg p-6"
            style={{ fontFamily: "Montserrat", letterSpacing: "0.2rem" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={phoneNo}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setIsPhoneNoValid(e.target.value === "" || e.target.value.length === 10);
                  }}
                  className={`w-full p-2 border rounded focus:outline-none ${
                    !isPhoneNoValid && phoneNo !== ""
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!isPhoneNoValid && phoneNo !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid phone number.
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsValidEmail(
                      e.target.value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    );
                  }}
                  className={`w-full p-2 border rounded focus:outline-none ${
                    !isValidEmail && email !== ""
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {!isValidEmail && email !== "" && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email address.
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="
                  w-full mt-4 py-3
                  bg-black text-white 
                  text-sm font-bold uppercase tracking-wider
                  rounded
                  hover:bg-gray-800 transition-colors
                "
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipping;
