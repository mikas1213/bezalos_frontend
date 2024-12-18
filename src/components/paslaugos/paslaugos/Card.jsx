import styles from './Card.module.css';
import img from '../../../assets/images/products/prod_1.webp';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';

const Card = ({ paslauga}) => {
    
    const navigate = useNavigate();
    const price = Math.round(paslauga.discount > 0 ?  paslauga.price - (paslauga.price * paslauga.discount / 100) : paslauga.price);
    const wasPrice = (paslauga.discount > 0 ? paslauga.price : 0);
    const slug = slugify(paslauga.title, {replacement: '-', lower: true, trim: true, strict: true });
    
    return (
        <div className={`${styles.card}`}>
            <div className={styles.imgContainer}>
                {paslauga.popular && <div className={styles.mostPopular}>Populiarus</div>}
                {paslauga.discount > 0 && <div className={styles.discount}>-{paslauga.discount}%</div>}
                <img 
                    src={img} 
                    alt={paslauga.title}
                    loading='lazy'
                />
            </div>

            <div className={styles.cardBody}>
                <div className={styles.priceContainer}>
                
                    <div className={styles.price}>
                        €{price.toFixed(2)}
                    </div>
                    {paslauga.discount > 0 && <div className={styles.wasPrice}>
                        €{wasPrice.toFixed(2)}
                    </div>}
                    
                </div>
                
                <div className={styles.title}>{paslauga.title}</div>
                <div className={styles.desc}>{paslauga.grid_desc}</div>

            </div>
            <div className={styles.buttons}>
                <button onClick={() => navigate(`/paslaugos/${slug}`) }>Rinktis</button>
            </div>
        </div>
    );
};

export default Card;