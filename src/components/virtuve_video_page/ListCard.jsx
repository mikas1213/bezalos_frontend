import styles from './ListCard.module.css';
import { Link } from 'react-router-dom';
import vebinarasImg from '../../assets/images/virtuve/vebinaras.webp';
import mokymaiImg from '../../assets/images/virtuve/mokymai.webp';

const ListCard = ({video}) => {
    
    return (
        <a href={`/virtuve/${video.src.replace('.mp4', '')}`}>
            <div className={styles.listCard}>
                <img src={video.category === 'Vebinaras' ? vebinarasImg : mokymaiImg} alt={video.title} className={styles.image} />
                <div className={styles.title}>
                    {video.title}
                </div>
            </div>
        </a>
    );
};

export default ListCard;