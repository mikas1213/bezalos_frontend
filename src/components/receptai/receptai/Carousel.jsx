import styles from './Carousel.module.css';
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FavRecipe from './FavRecipe_v5';

const Carousel = ({ favoriteRecipes, visibleItems, rotationInterval = 3000, pauseDuration = 1000 }) => {

    const itemCount = favoriteRecipes.length;
    const [items, setItems] = useState([]);
    const containerRef = useRef(null);
    const controls = useAnimation();
    
    
    useEffect(() => {
        // setItems(Array.from({ length: itemCount * 1 }, (_, i) => i % itemCount));
        setItems([...favoriteRecipes]);
    }, [favoriteRecipes, itemCount]);

    useEffect(() => {
        const moveItems = async () => {
            if(containerRef.current) {
                const itemWidth = containerRef.current.offsetWidth / visibleItems;

                // Move animation
                await controls.start({ x: -itemWidth, transition: { duration: 0.8, ease: 'easeInOut' }});

                // Pause
                await new Promise(resolve => setTimeout(resolve, pauseDuration));

                // Update items array
                setItems((prevItems) => {
                    const newItems = [...prevItems];
                    newItems.push(newItems[0]);
                    newItems.shift();
                    return newItems;
                });

                // Reset position
                controls.set({ x: 0 });
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
