import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Comment } from './Comment';
import { useEffect, useState } from 'react';

export function CommentSwiper()
{

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 4
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1
      }
    };

    return <>
        <Carousel responsive={responsive}
        arrows={false} showDots renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup /> }>
            <div><Comment/></div>
            <div><Comment/></div>
            <div><Comment/></div>
            <div><Comment/></div>
        </Carousel>
    </>
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="mt-[30px] flex items-center justify-center gap-6"> 
        <button className={currentSlide == 0 ? "bg-(--light-green) p-2.5 size-12  rounded-full" : "bg-(--primary-green) p-2.5 size-12  rounded-full"} onClick={() => previous()}>
            <i className="fa-solid fa-chevron-left text-white"></i>
        </button>

        <button className='p-2.5 size-12  rounded-full bg-(--primary-green)' onClick={() => next()}>
            <i className="fa-solid fa-chevron-right text-white "></i>
        </button>
   </div>
   )
}

