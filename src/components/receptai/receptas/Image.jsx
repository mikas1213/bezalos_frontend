import styles from './Image.module.css';
import { getImageFromBlob } from '../../../utils/images';

const Image = ({ recipe }) => {
    return (
        <div className={styles.image}>
            <img src={getImageFromBlob(recipe.photo_l, recipe.photo_type)} alt={recipe.title} />
        </div>
    );
};

export default Image;