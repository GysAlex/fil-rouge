import { Swiper, SwiperSlide } from 'swiper/react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export function LineFilter()
{

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 10
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 5
      },
      mobile: {
        breakpoint: { max: 568, min: 0 },
        items: 3,
        slidesToSlide: 2
      },
    };

    return <>
    <div className='max-w-[1000px] z-5 xl:w-full lg:w-[90%] w-[80%] mx-auto mt-[20px] md:mt-[90px]  md:relative sticky top-[89px] md:top-0'>
    <Carousel responsive={responsive}
        swipeable={true}
        sliderClass=''
        arrows={false}
        itemClass='min-w-fit md:mx-[3px] mx-[1px]'
        focusOnSelect={true}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup/>}
        >
        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1 py-2 border border-(--primary-green) text-(--primary-green)">
            Studio
        </div>

        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1 py-2 border border-(--primary-green) text-(--primary-green)">
            Chambre simple
        </div>
        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1 py-2 border border-(--primary-green) text-(--primary-green)">
            Haute qualité
        </div>

        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Prix abordable
        </div>
        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Qualité standard
        </div>

        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Zone calme
        </div>
        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Collocation
        </div>

        <div className="min-w-max select-none  pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Appartement
        </div>
        <div className="min-w-max select-none pointer-events-none  sm:text-sm text-xs rounded-2xl  flex flex-col items-center justify-center px-1  py-2 border border-(--primary-green) text-(--primary-green)">
            Studio meublé
        </div>

        </Carousel>

    </div>

    </>
}

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    const { carouselState: { currentSlide } } = rest;
    return (
      <div className="flex items-center -z-1 w-full justify-between gap-6 absolute top-[50%]" style={{transform: "translateY(-50%)"}}> 
        <button className={"p-2.5 size-12 rounded-full relative flex items-center justify-center"} onClick={() => previous()}>
            <i className="fa-solid size-8 cursor-pointer fa-chevron-left absolute -left-10 text-(--primary-green) text-3xl" ></i>
        </button>

        <button className='p-2.5 size-12  rounded-full relative flex items-center justify-center' onClick={() => next()}>
            <i className="fa-solid size-8 cursor-pointer fa-chevron-right absolute -right-10  text-(--primary-green) text-3xl" ></i>
        </button> 
   </div>
   )
}
