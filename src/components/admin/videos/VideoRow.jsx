import styles from './VideoRow.module.css';
import { Check, MessageCircle, CircleX, Heart, CirclePlay } from 'lucide-react';


const VideoRow = ({ video, setIsModalOpen, setFormValues, handleDeleteVideo }) => {

     const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        year: 'numeric',
        day: 'numeric', 
        month: 'numeric', 
    });
    
    return (
        <div className={styles.videoRow}>
            <img src={`https://bezalos.s3.us-east-1.amazonaws.com/${video.image_s3_key}`} className={styles.image} alt={video.title} />

            <div className={`${styles.section} ${styles.title}`} onClick={() => {
                setIsModalOpen({ isOpen:true, action: 'update'});
                setFormValues({...video, action: 'update'})}}>    
                <span>{video.title}</span>
            </div>

            <div className={styles.section}>
                {video.video_type}
            </div>

            <div className={styles.section}>
                {video.category}
            </div>

            <div className={styles.section}>
                {video.duration}
            </div>

            <div className={styles.section}>
                {created_video}
            </div>

            <div className={`${styles.section} ${styles.likes}`}>
                <Heart className={`${styles.icon} ${video.likes_count > 0 ? styles.liked : ''}`} /> 
                <span className={styles.value}>{video.likes_count}</span>
            </div>

            <div className={`${styles.section} ${styles.playCountSection}`}>
                <div className={styles.playCount}>
                    <CirclePlay className={styles.icon} />
                    <span className={styles.value}>{video.play_count}</span>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.playCount}>
                    <span className={styles.palyLabel}>80% </span>
                    <span className={styles.value}>{video.play_count_80}</span>
                </div>
            </div>  

            <div className={`${styles.section} ${styles.center} ${styles.comments}`}>
                <MessageCircle className={`${styles.icon} ${video.comments_count > 0 ? styles.filled : ''}`} /> 
                <span className={styles.value}>{video.comments_count}</span>
            </div>    

            <div className={`${styles.section} ${styles.center}`}>
                <span>{video.is_active ? 
                    <Check className={`${styles.icon} ${styles.green}`}/> : 
                    <CircleX className={`${styles.icon} ${styles.red}`} />}
                </span>
            </div>      
            
            <div className={`${styles.section} ${styles.deleteVideo}`}
                onClick={() => {
                    const is_delete = window.confirm('Trinti paslaugą?');
                    if(is_delete) {
                        handleDeleteVideo.mutate(video);
                    }
                }}
            >
                <CircleX className={styles.icon} />
            </div>           
        </div>
    );
};

export const VideoRowHeader = () => {
    return (
        <div className={styles.videoRowHeader}>
            <div className={styles.headerSection}></div>
            <div className={styles.headerSection}>Video</div>
            <div className={styles.headerSection}>Tipas</div>
            <div className={styles.headerSection}>Kategorija</div>
            <div className={styles.headerSection}>Trukmė</div>
            <div className={styles.headerSection}>Įkelta</div>
            <div className={styles.headerSection}>Likes</div>
            <div className={styles.headerSection}>Peržiūros</div>
            <div className={`${styles.headerSection} ${styles.center}`}>Komentarai</div>
            <div className={`${styles.headerSection} ${styles.center}`}>Aktyvus</div>
            <div className={styles.headerSection}></div>
        </div>
    );
}

export default VideoRow;