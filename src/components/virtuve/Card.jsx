import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const Card = ({ video, user_id, u_status, s_status, is_course }) => {
    
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        day: 'numeric', 
        weekday: 'short', 
        month: 'long', 
    });

    const video_types = { 
        kursai: 'c', 
        virtuve: 'v' 
    };

    const is_subscribed = user_id && (u_status === 'Virtuvė' || s_status === 'virtuve') && video.video_type === 'virtuve';
    const is_courses = user_id && is_course && video.video_type === 'kursai';
    
    return (    
        <Link to={`${video_types[video.video_type] || 'unknown'}/${video.slug}`}>
            <div className={`${styles.VideoCard} ${is_subscribed || is_courses ? '' : styles.cardLock}`}>
                <section>
                    <img src={`https://bezalos.s3.us-east-1.amazonaws.com/${video.image_s3_key}`} alt={video.title} />
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