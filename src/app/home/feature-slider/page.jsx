'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedSlider = ({ products }) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className=""
    >
      {products.map((product) => {
        const { _id, images, name } = product;
        return (
          <SwiperSlide key={_id}>
            <Link href={`/product/${_id}`}>
              <div className="relative w-full h-64">
                <Image
                  src={images[0].url}
                  alt={name}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
                  priority
                />
              </div>
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FeaturedSlider;
