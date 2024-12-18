import styles from './Paslauga.module.css';
import img from '../../../assets/images/products/prod_1.webp';
import Accordion from './Accordion';
import usePayment from '../../../hooks/usePayment';

const Paslauga = ({ paslauga }) => {
    const { handleServiceCheckout } = usePayment();
    return (
        <div className={styles.paslauga}>
            <div className={styles.left}>
                <img src={img} alt='img' className={styles.paslaugaImg} />
            </div>

            <div className={styles.right}>
                <div className={styles.paslaugaTitle}>
                    {paslauga.title}
                </div>

                <div className={styles.paslaugaDesc}>
                    {paslauga.desc}
                </div>

                <div className={styles.price}>
                    <span>€{paslauga.price.toFixed(2)}</span>
                </div>

                <div className={styles.buyBtn}>
                    <button onClick={() => handleServiceCheckout(paslauga.title, paslauga.price)}>Tęsti pirkimą</button>
                </div>

                <Accordion paslauga={paslauga} />
            </div>
        </div>
    );
};

export default Paslauga;