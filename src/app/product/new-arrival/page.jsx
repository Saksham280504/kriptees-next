'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '@/redux/actions/productAction';
import { toast } from 'react-toastify';
import MetaData from '@/components/Layouts/MetaData/MetaData';
import ProductCard from '@/components/Home/ProductCard';
import img from '../../../../public/ecommerce-images/NewArrTop.png';
import Image from 'next/image';
import CricketBallLoader from '@/components/Layouts/loader/CricketBallLoader';

export default function NewArrivalPage() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  // Filter products for new arrivals using tags "new" or "arriv"
  const NewArr = products.filter((p) =>
    p.tags &&
    p.tags.some((tag) => {
      const lowerTag = tag.toLowerCase();
      return lowerTag.includes('new') || lowerTag.includes('arriv');
    })
  );

  return (
    <>
      <MetaData title="Kriptees" />
      {loading ? (
        <CricketBallLoader/>
        ) : (
      <div className="Home_Page pt-14">
        {/* Top Banner */}
        <div className="w-full">
          <Image src={img} alt="Banner" className="w-full h-auto" />
        </div>

        {/* Heading & Subtext */}
        <div className="text-center px-4 py-8">
          <h2 className="text-5xl font-black uppercase tracking-widest mb-4">
            NEW ARRIVALS
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 text-sm leading-relaxed tracking-widest">
            This month, we’ve been hard at work bringing you fresh designs, premium quality, and exciting updates! From new anime merch drops to cozy hoodies and sweatshirts, we’re leveling up your style game. Stay tuned for more surprises next month!
          </p>
        </div>

        {/* New Arrivals Products */}
        {NewArr.length > 0 && (
          <div className="md:mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8 p-3 md:px-8">
            {NewArr.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    )}
    </>
  );
}

