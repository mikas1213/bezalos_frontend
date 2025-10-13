import styles from './FavoriteRecipes.module.css';
import Carousel from './Carousel';
import { useMediaQuery } from '../../../contexts/MediaQueryProvider';

const FavoriteRecipes = ({ mostLiked, isLoading }) => {
    const mediaQuery = useMediaQuery();
    return (
        <>
            {!isLoading && mostLiked &&
            <>
                <div className={styles.header}>Mėgstamiausi</div>
                <Carousel 
                    isLoading={isLoading}
                    mostLiked={mostLiked} 
                    visibleItems={mediaQuery < 376 ? 1 : mediaQuery < 769 ? 2 : 3} 
                    rotationInterval={3000} 
                    pauseDuration={1000} />
            </>}
        </>
    );
};

export default FavoriteRecipes;

