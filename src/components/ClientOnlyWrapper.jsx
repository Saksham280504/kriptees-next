"use client";

import ScrollToTop from "../hooks/useScrollToTop";

export default function ClientOnlyWrapper({ children }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
