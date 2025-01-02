import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.numbers}>
                <div>404</div>
                <div>Puslapis nerastas</div>
            </div>
        </div>
    );
};

export default NotFound;