"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { load_UserProfile } from "@/redux/actions/userAction"; // Adjusted import path

function Activator() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);

  return null; // Needed so this component returns valid JSX
}

export default Activator;
