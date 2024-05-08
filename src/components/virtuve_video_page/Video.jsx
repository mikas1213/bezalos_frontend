import styles from './Video.module.css';
import { useState } from 'react';

const Video = ({ video, isLoading }) => {
    const [showMore, setShowMore] = useState(false);
    const desc = video?.data.description || '';
    
    return (
        <div className={styles.video}>
            {!isLoading && <video 
                onContextMenu={ event => event.preventDefault() }
                controls={true}
                autoPlay
                playsInline
                controlsList='nodownload' 
                width='100%'
            >
                <source src={video?.url} type='video/mp4' />
            </video>}
            
            <div className={styles.cardBottom}>
                <div className={styles?.title}>
                    {video?.data?.title}
                </div>

                <div className={styles.description}>
                    {desc.length <  180 ? desc : <>
                        { showMore ? desc+' ' : desc.substring(0, 180)+'... '}
                        <span 
                            className={styles.showMore} 
                            onClick={() => setShowMore(show => !show)}>
                            {showMore ? 'mažiau' : 'daugiau'}
                        </span>
                    </>}
                </div>
            </div>
        </div>
    );
};

export default Video;