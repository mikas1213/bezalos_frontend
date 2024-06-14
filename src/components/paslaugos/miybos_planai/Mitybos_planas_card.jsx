import styles from './Mitybos_planas_card.module.css';

const Mitybos_planas_card = ({handleServiceCheckout, product}) => {
    return (
        <div className={styles.serviceCard}>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>{product.price}</div>
            <button onClick={() => handleServiceCheckout(product)}>Pirkt!!! Dabar!!!!</button>
        </div>
    );
};

export default Mitybos_planas_card;