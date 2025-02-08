import styles from './Image.module.css';
import { getImageURL } from '../../../utils/images';

const Image = () => {
    return (
        <div className={styles.image}>
            <img src={getImageURL(`recipes/image_4.png`)} alt='Receptas' />
        </div>
    );
};

export default Image;