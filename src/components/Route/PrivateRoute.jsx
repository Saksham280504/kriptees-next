// src/components/Route/PrivateRoute.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { load_UserProfile } from "@/actions/userAction";

const PrivateRoute = ({ children, isAdmin = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { isAuthenticated, user, loading } = useSelector((state) => state.userData);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      const sessionUser = sessionStorage.getItem("user");

      if (token && (!user || !sessionUser)) {
        await dispatch(load_UserProfile());
      }
      setIsInitialLoad(false);
    };

    loadUser();
  }, [dispatch, user]);

  if (isInitialLoad || loading) {
    return <div>Loading...</div>;
  }

  const token = localStorage.getItem("token");
  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");

  if (!token) {
    router.replace(`/login?from=${pathname}`);
    return null;
  }

  if (isAdmin) {
    const currentUser = user || sessionUser;

    if (currentUser && currentUser.role !== "admin") {
      router.replace("/");
      return null;
    }

    if (!currentUser) {
      return <div>Loading...</div>;
    }
  }

  return children;
};

export default PrivateRoute;
