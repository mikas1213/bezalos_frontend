import styles from './ListCard.module.css';
import { Link } from 'react-router-dom';
import { FaCirclePlay } from 'react-icons/fa6';
import { getImageURL } from '../../utils/images';

const ListCard = ({ video }) => {
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString(
        "lt-LT",
        {
            day: "numeric",
            weekday: "short",
            month: "long",
            // year: 'numeric'
        }
    );

    return (
        <Link to={`/virtuve/${video.video_url}`}>
            <div className={styles.listCard}>
                <div className={styles.imageContainer}>
                    <img src={getImageURL(`virtuve/${video.video_url}.webp`)} alt={video.video_url} className={styles.image} />
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
