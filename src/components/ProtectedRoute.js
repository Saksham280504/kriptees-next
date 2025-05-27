// src/components/ProtectedRoute.js
"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state) => state.userData);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (!isAuthenticated) {
    return null; // Or a loader while redirecting
  }

  return children;
};

export default ProtectedRoute;
