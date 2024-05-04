import styles from './Card.module.css';

import { useEffect } from 'react';
import vebinarasImg from '../../assets/images/virtuve/vebinaras.webp';
import mokymaiImg from '../../assets/images/virtuve/mokymai.webp';

const Card = ({ video }) => {
    useEffect(() => {
        // document.querySelector('video').setAttribute('oncontextmenu', "return false;");
    }, []);
    const created_video = new Date(Date.parse(video.created_at)).toLocaleString('lt-LT', {
        day: 'numeric', 
        weekday: 'short', 
        month: 'long', 
        // year: 'numeric'
    });
    console.log(created_video)
    return (
        <>
            <div className={styles.VideoCard}>

                    <section>
                        <img src={video.category === 'Mokymai' ? mokymaiImg : vebinarasImg} alt='video cover'/>
                    </section>

                    <div className={styles.cardProperties}>
                        <div className={styles.title}>{video.title}</div>
                        <div className={styles.description}>
                            Loreipsum adf asdf asdf asdf asdf adsf asfa asdf asdf adsf asdfadsfasdfasdfas Loreipsum adf asdf asdf asdf asdf adsf asfa asdf asdf adsf asdfadsfasdfasdfas Loreipsum adf asdf asdf asdf asdf adsf asfa asdf asdf adsf asdfadsfasdfasdfas
                        </div>

                        <div className={styles.category}>
                            <span>{video.category}</span>
                        </div> 
                        <div className={styles.createdAt}>{created_video}</div>
                    </div>
            </div>
        </>
    );
};

export default Card;