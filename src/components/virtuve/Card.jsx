import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import vebinarasImg from '../../assets/images/virtuve/vebinaras.webp';
import mokymaiImg from '../../assets/images/virtuve/mokymai.webp';

const Card = ({ video }) => {
    console.log(video)
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        day: 'numeric', 
        weekday: 'short', 
        month: 'long', 
        // year: 'numeric'
    });
    
    return (
        <Link to={video.video_url}>
            <div className={styles.VideoCard}>
                <section>
                    <img src={video.category === 'Mokymai' ? mokymaiImg : vebinarasImg} alt='video cover'/>
                </section>

                <div className={styles.cardProperties}>
                    <div className={styles.title}>{video.title}</div>
                    <div className={styles.description}>
                        {video.description}
                    </div>

                    <div className={styles.category}>
                        <span>{video.category}</span>
                    </div> 
                    <div className={styles.createdAt}>{created_video}</div>
                </div>
            </div>
        </Link>
    );
};

export default Card;