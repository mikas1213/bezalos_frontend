import styles from './FavoriteRecipes.module.css';
import Carousel from './Carousel';
import useMediaQuery from '../../../hooks/useMediaQuery';

const FavoriteRecipes = ({ favoriteRecipes }) => {
    const mediaQuery = useMediaQuery();
    console.log(mediaQuery)
    return (
        <div className={styles.favoriteRecipes}>
            <div className={styles.header}>Mėgstamiausi</div>
            <Carousel 
                favoriteRecipes={favoriteRecipes} 
                visibleItems={mediaQuery < 376 ? 1 : mediaQuery < 769 ? 2 : 3} 
                rotationInterval={2500} 
                pauseDuration={1000} 
            />
        </div>
    );
};

export default FavoriteRecipes;

