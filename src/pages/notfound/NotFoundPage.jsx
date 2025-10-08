import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <>
            <div className={styles.page404}>
                <div className={styles.numbers}>
                    <div>404</div>
                    <div>Puslapis nerastas</div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
