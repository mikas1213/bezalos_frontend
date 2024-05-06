import styles from './Video.module.css';
import { useState, useEffect } from 'react';

const Video = ({ video, isLoading }) => {
    const [showMore, setShowMore] = useState(false);
    const desc = 'asdfjald fjalsdkfj paisjdfpoi ajdfpiajsp fiajsdpf iajsdpfi jaspdfi japdiof japsdoif japsodif japsodifj paosdifj paosdifj paoidfj paoijdf japsodifj paosdifj paosdifj paoidfj paoijdf japsodifj paosdifj paosdifj paoidfj paoijdf';
    useEffect(() => {
        document.querySelector('video')?.setAttribute('oncontextmenu', 'return false;');
    }, []);
    
    
    return (
        <div className={styles.video}>
            {!isLoading && <video 
                controls 
                autoPlay={true} 
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