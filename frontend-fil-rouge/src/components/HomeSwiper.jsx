import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Home, HomeDyn } from './Home';

function HomeSwiper({properties})
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
        breakpoint: { max: 568, min: 0 },
        items: 1,
        slidesToSlide: 1
      },
    };

    return <div className='md-w-[90%] lg:w-full mx-auto relative -z-0'>
    <Carousel responsive={responsive}
        swipeable={true}
        arrows={true}
        sliderClass=''
        containerClass='py-4 container'
        itemClass='mx-4 min-w-fit'
        focusOnSelect={true}
        renderButtonGroupOutside={true}
        >

          {properties.length > 0 && properties.map((propertie) => {
            return <HomeDyn home={propertie}/>
          }
        )}
        <div></div>
        <div></div>
        </Carousel>
    </div>
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="flex items-center w-full justify-between"> 
        <button className={"p-2.5 size-12 rounded-full relative flex items-center justify-center"} onClick={() => previous()}>
            <i className="fa-solid size-8 cursor-pointer fa-chevron-left text-(--primary-green) text-3xl" ></i>
        </button>

        <button className='p-2.5 size-12  rounded-full flex items-center justify-center' onClick={() => next()}>
            <i className="fa-solid size-8 cursor-pointer fa-chevron-right  text-(--primary-green) text-3xl" ></i>
        </button> 
   </div>
   )
}

export {HomeSwiper}