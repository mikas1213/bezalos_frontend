import styles from './Image.module.css';

const Image = ({ recipe }) => {
    return (
        <div className={styles.image}>
            <img src={recipe.image_l} alt={recipe.title} />
        </div>
    );
};

export default Image;