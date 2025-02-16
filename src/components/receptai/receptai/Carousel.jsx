import styles from './Carousel.module.css';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FavRecipe from './FavRecipe';

const Carousel = ({ mostLiked, visibleItems, rotationInterval = 3000, pauseDuration = 1000 }) => {

    const itemCount = mostLiked.length;
    const containerRef = useRef(null);
    const controls = useAnimation();
    const [items, setItems] = useState(mostLiked);
    
    // useEffect(() => {
    //     setItems([...mostLiked]);
    // }, [mostLiked, itemCount]);

    useEffect(() => {
        const moveItems = async () => {
            if(containerRef.current) {
                const itemWidth = containerRef.current.offsetWidth / visibleItems;

                await controls.start({ x: -itemWidth, transition: { duration: 0.8, ease: 'easeInOut' }});
                controls.set({ x: 0 });

                setItems((prevItems) => {
                    const [first, ...rest] = prevItems;
                    return [...rest, first];
                });
            }
        };

        const timer = setInterval(moveItems, rotationInterval);
        return () => clearInterval(timer);
    }, [visibleItems, rotationInterval, pauseDuration, controls]);

    return (
        <div className={styles.carouselContainer} ref={containerRef}>
            <motion.div className={styles.carouselTrack} animate={controls}>
                {items.map(item => (
                    <div key={item.id} className={styles.carouselItem} style={{ width: `${100 / visibleItems}%` }}>
                        <FavRecipe recipe={item} />                    
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Carousel;
