import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/Providers/AppProvider";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={`antialiased`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
