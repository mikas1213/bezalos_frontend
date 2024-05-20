import styles from './Card.module.css';
import { Link } from 'react-router-dom';

import vebinarasImg from '../../assets/images/virtuve/vebinaras.webp';
import mokymaiImg from '../../assets/images/virtuve/mokymai.webp';
import { FaLock } from "react-icons/fa";


const Card = ({ video, user_id, user_subscription }) => {

    const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        day: 'numeric', 
        weekday: 'short', 
        month: 'long', 
        // year: 'numeric'
    });
    
    return (
        <Link to={video.video_url}>
            <div className={`${styles.VideoCard} ${(user_id && user_subscription) ? '' : styles.cardLock}`}>
                <section>
                    <img src={video.category === 'Mokymai' ? mokymaiImg : vebinarasImg} alt='video cover'/>
                    <div className={styles.iconContainer}>
                        <FaLock className={styles.icon} />
                    </div>
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