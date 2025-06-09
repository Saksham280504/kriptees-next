"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { clearErrors, getProduct } from "@/redux/actions/productAction";
import MetaData from "@/components/Layouts/MetaData/MetaData";
import ProductCard from "@/components/Home/ProductCard";

import img from "../../public/ecommerce-images/banner.png";
import image from "../../public/ecommerce-images/downimg.png";
import midimage from "../../public/ecommerce-images/midimg.png";
import mobBanner from "../../public/ecommerce-images/mobBanner.png";

import Image from "next/image";

export default function HomePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, products } = useSelector((state) => state.products);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const features = [
    {
      title: "SHIPPING PAN INDIA",
      lines: ["MADE IN INDIA", "DELIVERING PAN INDIA"],
    },
    {
      title: "FREE RETURN AND EXCHANGE",
      lines: ["7 DAYS EASY RETURNS", "NO QUESTIONS ASKED"],
    },
    {
      title: "100% HOME GROWN BRAND",
      lines: ["PRODUCTS ARE 100%", "MADE IN INDIA"],
    },
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setActiveFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
      }, 3000);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
    };
  }, [isMobile]);

  const topPicks = useMemo(() => {
    return products.filter(
      (p) =>
        p.tags &&
        p.tags.some(
          (tag) =>
            tag.toLowerCase().includes("new") ||
            tag.toLowerCase().includes("arriv")
        )
    );
  }, [products]);

  const Tshirt = useMemo(
    () => products.filter((p) => p.category === "T-shirt"),
    [products]
  );

  const hoodies = useMemo(
    () => products.filter((p) => p.category === "Hoodie"),
    [products]
  );

  return (
    <>
      <MetaData title="Kriptees" />
      <div className="w-full">
        <div className="w-full">
          <Image
            src={img}
            alt="Desktop Banner"
            className="w-full h-auto hidden md:block"
          />
          <Image
            src={mobBanner}
            alt="Mobile Banner"
            className="w-full pt-14 h-auto block md:hidden"
          />
        </div>

        <div className="bg-black text-white py-2 overflow-hidden font-montserrat tracking-widest">
          <div className="custom-animate-marquee">
            <span className="text-sm md:text-[1.2rem] uppercase tracking-widest px-4 inline-block whitespace-nowrap">
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH! &nbsp;
              NEW ARRIVALS EVERY MONTH! &nbsp; NEW ARRIVALS EVERY MONTH!
            </span>
          </div>
        </div>

        {topPicks.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              TOP PICKS
            </h2>
            <div className="mt-4 md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {topPicks.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => router.push("/NewArrival")}
                className="bg-white text-gray-800 font-Ponnala px-4 py-2 md:px-6 md:py-3 uppercase tracking-widest border border-gray-950 rounded-lg hover:bg-gray-400 transition-colors"
              >
                View All
              </button>
            </div>
          </>
        )}

        <div className="w-full mt-6 md:mt-8">
          <Image src={midimage} alt="Banner" className="w-full h-auto" />
        </div>

        {Tshirt.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              T-SHIRT
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {Tshirt.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => router.push("/Tshirt")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8l8 8 8-8"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        {hoodies.length > 0 && (
          <>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-widest py-4 mx-4 md:m-8 md:px-10 md:py-4">
              HOODIES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 px-3 md:px-8">
              {hoodies.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-6 md:mt-8">
              <button
                onClick={() => router.push("/Hoodies")}
                className="p-2 rounded-full border border-black hover:bg-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8l8 8 8-8"
                  />
                </svg>
              </button>
            </div>
          </>
        )}

        <div className="mt-8 border-y-2 border-slate-200 py-6 font-montserrat tracking-widest">
          <div className="hidden md:flex md:flex-row justify-center items-center gap-[20rem] text-center px-4">
            {features.map((feature, index) => (
              <div key={index} className="max-w-xs">
                <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-700">
                  {feature.lines[0]}
                  <br />
                  {feature.lines[1]}
                </p>
              </div>
            ))}
          </div>
          <div className="block md:hidden flex flex-col justify-center items-center text-center px-4">
            <div className="max-w-xs">
              <h3 className="font-bold text-sm uppercase mb-1 underline underline-offset-4 py-2">
                {features[activeFeatureIndex].title}
              </h3>
              <p className="text-xs text-gray-700">
                {features[activeFeatureIndex].lines[0]}
                <br />
                {features[activeFeatureIndex].lines[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
