import styles from './ListCard.module.css';
import { Link } from 'react-router-dom';
import { FaCirclePlay } from 'react-icons/fa6';

const ListCard = ({ video }) => {
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString("lt-LT",
        {
            day: "numeric",
            weekday: "short",
            month: "long"
        }
    );
    const video_types = { 
        kursai: 'c', 
        virtuve: 'v' 
    };

    return (
        <Link to={`/virtuve/${video_types[video.video_type] || 'unknown'}/${video.slug}`}>
            <div className={styles.listCard}>
                <div className={styles.imageContainer}>
                    <img src={`https://bezalos.s3.us-east-1.amazonaws.com/${video.image_s3_key}`} alt={video.slug} className={styles.image} />
                    <FaCirclePlay className={styles.icon} />
                    <span className={styles.duration}>{video.duration}</span>
                </div>

                <div className={styles.cardBottom}>
                    <div className={styles.title}>{video.title}</div>
                    <div className={styles.cardFooter}>
                        <div className={styles.category}>
                            <span>{video.category}</span>
                        </div>
                        <div className={styles.created_at}>{created_video}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ListCard;
