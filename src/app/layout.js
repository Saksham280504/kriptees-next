// app/layout.js

import { Provider } from "react-redux";
import store from "@/redux/store";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Layouts/Header/Header";
import Footer from "@/components/Layouts/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientOnlyWrapper from "@/components/ClientOnlyWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kriptees",
  description: "Your fashion destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <Header />
          
          {/* ✅ Wrap client-only logic + children */}
          <ClientOnlyWrapper>
            {children}
          </ClientOnlyWrapper>

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
      </body>
    </html>
  );
}
