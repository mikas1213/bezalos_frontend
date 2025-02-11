import styles from './Image.module.css';
import { getImageURL } from '../../../utils/images';

const Image = ({ slug }) => {
    return (
        <div className={styles.image}>
            <img src={getImageURL(`recipes/${slug}.png`)} alt='Receptas' />
        </div>
    );
};

export default Image;