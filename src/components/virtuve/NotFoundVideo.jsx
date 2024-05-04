import styles from "./NotFoundVideo.module.css";
import img from "../../assets/images/virtuve/not-found-video.webp";

const NotFoundVideo = () => {
    return (
        <div className={styles.container}>
            <div>
                <img src={img} alt="cat not found" />
                <span>Deja, pagal šią užklausą nieko rasti nepavyko</span>
            </div>
        </div>
    );
};

export default NotFoundVideo;
