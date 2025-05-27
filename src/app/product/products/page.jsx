'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-toastify";
import { clearErrors, getProduct } from "@/actions/productAction";
import Loader from "@/components/Layouts/loader/Loader";
import { Menu, X, Filter } from 'lucide-react';

const DEFAULT_FILTERS = {
  price: [0, 25000],
  category: "",
  ratings: 0,
  currentPage: 1,
  sortBy: "newest"
};

const PriceRangeSlider = ({ value, onChange }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const getPercent = (value) => ((value - 0) / (25000 - 0)) * 100;

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
    onChange([value, maxValue]);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
    onChange([minValue, value]);
  };

  return (
    <div className="w-full px-4 py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-medium">₹{minValue}</span>
        <span className="text-base font-medium">₹{maxValue}</span>
      </div>
      <div className="relative h-8 mb-4">
        <div className="absolute w-full h-1 bg-blue-200 rounded top-1/2 transform -translate-y-1/2">
          <div
            className="absolute h-full bg-blue-600 rounded"
            style={{
              left: `${getPercent(minValue)}%`,
              width: `${getPercent(maxValue) - getPercent(minValue)}%`
            }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={25000}
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full top-1/2 -translate-y-1/2 h-1 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
        <input
          type="range"
          min={0}
          max={25000}
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full top-1/2 -translate-y-1/2 h-1 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
    </div>
  );
};

const categories = ["Clothing", "T-shirt", "Hoodies"];

const Products = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const { products, filterdProductCount = 0, loading, error } = useSelector((state) => state.products);
  const [currentFilters, setCurrentFilters] = useState(() => {
    if (!sessionStorage.getItem('navigationState')) {
      sessionStorage.setItem('navigationState', 'initial');
      return DEFAULT_FILTERS;
    }
    const storedFilters = sessionStorage.getItem('productFilters');
    return storedFilters ? JSON.parse(storedFilters) : DEFAULT_FILTERS;
  });

  const [pendingFilters, setPendingFilters] = useState(() => {
    const storedFilters = sessionStorage.getItem('productFilters');
    return storedFilters ? JSON.parse(storedFilters) : DEFAULT_FILTERS;
  });

  const [sortOpen, setSortOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('navigationState');
      sessionStorage.removeItem('productFilters');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    if (pathname === '/products') {
      const storedFilters = sessionStorage.getItem('productFilters');
      if (storedFilters) {
        setCurrentFilters(JSON.parse(storedFilters));
        setPendingFilters(JSON.parse(storedFilters));
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(
      "",
      currentFilters.currentPage,
      currentFilters.price,
      currentFilters.category,
      currentFilters.ratings,
      currentFilters.sortBy
    ));
  }, [dispatch, error, currentFilters]);

  useEffect(() => {
    sessionStorage.setItem('productFilters', JSON.stringify(currentFilters));
  }, [currentFilters]);

  const handlePriceChange = (priceRange) => setPendingFilters(prev => ({ ...prev, price: priceRange }));
  const handleCategoryChange = (cat) => setPendingFilters(prev => ({ ...prev, category: cat === prev.category ? "" : cat }));
  const handleRatingChange = (rating) => setPendingFilters(prev => ({ ...prev, ratings: rating === prev.ratings ? 0 : rating }));
  const handleSort = (sortType) => {
    const newFilters = { ...pendingFilters, sortBy: sortType, currentPage: 1 };
    setPendingFilters(newFilters);
    setCurrentFilters(newFilters);
    setSortOpen(false);
  };

  const applyFilters = () => {
    const newFilters = { ...pendingFilters, currentPage: 1 };
    setCurrentFilters(newFilters);
  };

  const resetFilters = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setCurrentFilters(DEFAULT_FILTERS);
    sessionStorage.removeItem('productFilters');
  };

  const toggleFilters = () => setIsFilterVisible(!isFilterVisible);
  const handlePageChange = (page) => {
    const newFilters = { ...currentFilters, currentPage: page };
    setPendingFilters(newFilters);
    setCurrentFilters(newFilters);
  };

  const getPaginationArray = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filterdProductCount / PRODUCTS_PER_PAGE) && i <= 10; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <>
      <Head><title>Products</title></Head>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white min-h-screen">
          <div className="text-center py-2 bg-red-500 text-white">
            free delivery on first order above 499rs
          </div>

          <main className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
            {/* 👇 Continue migrating rest of JSX: product grid, filter sidebar, etc. */}
          </main>
        </div>
      )}
    </>
  );
};

export default Products;
