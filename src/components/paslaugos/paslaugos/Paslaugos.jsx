import styles from './Paslaugos.module.css';
import Card from './Card';

const Paslaugos = ({ isLoading, paslaugos }) => {
    return (
        <>
        {isLoading ? 
            <div className={styles.loadingContainer}></div> :
                paslaugos ? 
                <div className={`${styles.paslaugos} padding--b`}>
                    {paslaugos.map(paslauga => <Card key={paslauga.id} paslauga={paslauga} />)}
                </div> :
            <div className={styles.notFoundContainer}>Šiuo metu paslaugų nerasta</div>
        }
        </>
    );
};

export default Paslaugos;