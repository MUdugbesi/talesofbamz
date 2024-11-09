import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from 'swiper/modules';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa6';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import './Swiper.css';

const Slider = ({ gallery }) => {
  return (
    <>
      <>
        <div className='container'>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 25,
              stretch: 0,
              depth: 300,
              modifier: 2.5,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            className='swiper_container'
          >
            {gallery.map((item) => {
              return (
                <SwiperSlide key={item.id} className='swiper-slide'>
                  <img src={item.url} alt={item.name} />
                </SwiperSlide>
              );
            })}

            <div className='slider-controler'>
              <div className='swiper-button-prev slider-arrow'>
                <FaArrowLeft />
              </div>
              <div className='swiper-button-next slider-arrow'>
                <FaArrowRight />
              </div>
              {gallery.length <= 10 && (
                <div className='swiper-pagination'></div>
              )}
            </div>
          </Swiper>
        </div>
      </>
    </>
  );
};

export default Slider;
