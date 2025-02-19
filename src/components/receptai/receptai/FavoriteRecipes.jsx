import styles from './FavoriteRecipes.module.css';
import Carousel from './Carousel';
import useMediaQuery from '../../../hooks/useMediaQuery';

const FavoriteRecipes = ({ mostLiked }) => {
    const mediaQuery = useMediaQuery();
    
    return (
        <div className={styles.favoriteRecipes}>
            <div className={styles.header}>Mėgstamiausi</div>
            <Carousel 
                mostLiked={mostLiked} 
                visibleItems={mediaQuery < 376 ? 1 : mediaQuery < 769 ? 2 : 3} 
                rotationInterval={30000} 
                pauseDuration={1000} 
            />
        </div>
    );
};

export default FavoriteRecipes;

