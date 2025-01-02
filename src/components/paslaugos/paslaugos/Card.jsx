import styles from './Card.module.css';
import { useState } from 'react';
import { getImageURL } from '../../../utils/images';
import { useNavigate } from 'react-router-dom';

const Card = ({ paslauga }) => {

    const navigate = useNavigate();
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className={`${styles.card}`}>
            <div className={styles.imgContainer}>
                {paslauga.popular && <div className={styles.mostPopular}>Populiarus</div>}
                {paslauga.discount > 0 && <div className={styles.discount}>-{paslauga.discount}%</div>}

                {!imageLoaded && <div className={styles.skeleton}></div>}

                <img 
                    src={getImageURL(`paslaugos/${paslauga.slug+'_small'}.webp`)} 
                    alt={paslauga.title}
                    onLoad={() => setImageLoaded(true)}
                    style={{ opacity: imageLoaded ? 1 : 0 }}
                    className={paslauga.slug === 'demesingo-valgymo-mokymai' ? styles.spcificImgSize : ''}
                />
            </div>

            <div className={styles.cardBody}>
                <div className={styles.priceContainer}>
                
                    <div className={styles.price}>
                        €{paslauga.current_price}
                    </div>
                    {paslauga.discount > 0 && <div className={styles.wasPrice}>
                        €{paslauga.base_price}
                    </div>}
                    
                </div>
                
                <div className={styles.title}>{paslauga.title}</div>
                <div className={styles.desc}>{paslauga.grid_desc}</div>

            </div>
            <div className={styles.buttons}>
                <button onClick={() => navigate(`/paslaugos/${paslauga.slug}`) }>Rinktis</button>
            </div>
        </div>
    );
};

export default Card;