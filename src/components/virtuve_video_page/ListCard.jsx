import styles from "./ListCard.module.css";
import { Link } from "react-router-dom";
import { FaCirclePlay } from "react-icons/fa6";
import vebinarasImg from "../../assets/images/virtuve/vebinaras.webp";
import mokymaiImg from "../../assets/images/virtuve/mokymai.webp";

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
                <img
                    src={
                        video.category === "Vebinaras"
                            ? vebinarasImg
                            : mokymaiImg
                    }
                    alt={video.title}
                    className={styles.image}
                />
                <FaCirclePlay className={styles.icon} />
                <span className={styles.time}>30:49</span>
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
