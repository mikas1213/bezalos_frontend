import styles from './VideoRow.module.css';
import { getImageURL } from '../../../utils/images';
import { Check, CircleX, Heart } from 'lucide-react';

const VideoRow = ({ video, setIsModalOpen, setFormValues, handleDeleteVideo }) => {

     const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        year: 'numeric',
        day: 'numeric', 
        month: 'numeric', 
    });

    return (
        <div className={styles.videoRow}>
            <img src={getImageURL(`virtuve/${video.video_url}.webp`)}  className={styles.image} alt={video.title} />

            <div className={`${styles.section} ${styles.title}`} onClick={() => {
                setIsModalOpen(true);
                setFormValues(video)}}>    
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

            <div className={`${styles.section} ${styles.center}`}>
                {video.comments_count}
            </div>    

            <div className={`${styles.section} ${styles.centerr} ${styles.like}`}>
                <Heart className={video.likes_count > 0 ? styles.liked : ''} /> 
                <span>{video.likes_count}</span>
            </div>   

            <div className={styles.section}>
                {created_video}
            </div>       
            
            <div className={`${styles.section} ${styles.center}`}>
                {video.is_active ? <Check className={styles.iconActive}/> : <CircleX className={styles.iconNonActive} />}
            </div>      
            
            <div 
                className={`${styles.section} ${styles.deleteVideo}`}
                onClick={() => {
                    const is_delete = window.confirm('Trinti paslaugą?');
                    if(is_delete) {
                        console.log('deleted video: ', video.id)
                        handleDeleteVideo.mutate(video.id);
                    }
                }}
            >
                <CircleX className={styles.iconDelete} />
            </div>           
        </div>
    );
};

export const VideoRowHeader = () => {
    return (
        <div className={styles.videoRowHeader}>
            <div className={styles.section}></div>
            <div className={styles.section}>Video</div>
            <div className={styles.section}>Tipas</div>
            <div className={styles.section}>Kategorija</div>
            <div className={styles.section}>Trukmė</div>
            <div className={`${styles.section} ${styles.center}`}>Komentarai</div>
            <div className={`${styles.section} ${styles.centerr}`}>Likes</div>
            <div className={styles.section}>Įkelta</div>
            <div className={`${styles.section} ${styles.center}`}>Aktyvus</div>
            <div className={styles.section}></div>
        </div>
    );
}

export default VideoRow;