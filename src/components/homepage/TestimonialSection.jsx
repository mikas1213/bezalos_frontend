import styles from "./TestimonialSection.module.css";

import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

import { FaStar } from "react-icons/fa6";

// import React, { useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";

const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.';
const TestimonialCard = ({title, text}) => {
    return (
        <div className={styles.testimonialCard}>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
            <div className={styles.stars}>
                {Array.from({length: 5}, (v, i) => <FaStar className={styles.icon} key={i}/>)}
            </div>
        </div>
    );
};

// import { Autoplay, Pagination, Navigation } from "swiper/modules";
const TestimonialSection = () => {

    return (
        <section className={`${styles.testimonialSection} section--hidden`}>
            <div className={styles.testimonialContainer}>
            <TestimonialCard title='Awesome tool!' text={text}/>
            <TestimonialCard title='Awesome tool!' text={text}/>
            <TestimonialCard title='Awesome tool!' text={text}/>
            
                {/* <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    loop={true}        
                    modules={[Autoplay, Navigation, Pagination]}
                    className="mySwiper"
                    navigation={false}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                        </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <TestimonialCard title='Awesome tool!' text={text}/>
                    </SwiperSlide>
                </Swiper> */}
            </div>
        </section>
    );
};

export default TestimonialSection;
