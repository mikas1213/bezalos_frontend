import styles from './Card.module.css';
import { Link } from 'react-router-dom';

import { FaLock } from 'react-icons/fa';
import { getImageURL } from '../../utils/images';
import vebinarasImg from '../../assets/images/virtuve/vebinaras.webp';
import mokymaiImg from '../../assets/images/virtuve/mokymai.webp';
import vebinarasGydytojaiImg from '../../assets/images/virtuve/policistiniu-kiausidziu-sindromas.webp';

const Card = ({ video, user_id, user_subscription, s_status }) => {
    console.log('Video: ', video)
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        day: 'numeric', 
        weekday: 'short', 
        month: 'long', 
        // year: 'numeric'
    });
    
    return (
        <Link to={video.video_url}>
            <div className={`${styles.VideoCard} ${(user_id && (user_subscription || s_status === 'virtuve')) ? '' : styles.cardLock}`}>
                <section>
                    {/* {video.video_url === 'policistiniu-kiausidziu-sindromas' 
                    ? <img src={video.category === 'Mokymai' ? mokymaiImg : vebinarasGydytojaiImg} alt='video cover'/>
                    : <img src={video.category === 'Mokymai' ? mokymaiImg : vebinarasImg} alt='video cover'/>
                    } */}

                    <img src={getImageURL(`virtuve/${video.video_url}.webp`)} alt={video.title} />
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