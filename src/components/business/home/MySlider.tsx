import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const ImageSlider = () => {
  const slides = [
    { id: 1, url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80', title: 'Гірське озеро' },
    { id: 2, url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80', title: 'Альпійський будинок' },
    { id: 3, url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80', title: 'Загадковий ліс' },
    { id: 4, url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80', title: 'Захід сонця на морі' },
  ];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        watchSlidesProgress={true}
        autoplay={{ delay: 5000, disableOnInteraction: false, waitForTransition: true }}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="slide-image-wrapper">
              <img src={slide.url} alt={slide.title} className="slide-img" />
              <div className="slide-overlay">
                <h3>{slide.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .slider-container {
          width: 90%;
          margin: 40px auto;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .slide-image-wrapper {
          position: relative;
          height: 700px;
          width: 100%;
        }

        .slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* Це важливо: картинка заповнює блок без деформації */
        }

        .slide-overlay {
          position: absolute;
          bottom: 40px;
          left: 40px;
          color: white;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          font-family: sans-serif;
        }

        .slide-overlay h3 {
          font-size: 2rem;
          margin: 0;
        }

        /* Налаштування кольору пагінації та стрілок */
        .swiper-button-next, .swiper-button-prev {
          color: #fff !important;
        }
        .swiper-pagination-bullet-active {
          background: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default ImageSlider;