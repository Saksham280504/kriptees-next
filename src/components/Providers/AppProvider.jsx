"use client";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";
import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <Header />
      <ClientOnlyWrapper>{children}</ClientOnlyWrapper>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Provider>
  );
}
