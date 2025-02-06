import styles from './InfoTab.module.css';

const InfoTab = ({ recipesCount }) => {
    return (
        <div className={styles.infoTab}>
            <div className={styles.recipesInfo}>
                Iš viso rasta&nbsp;<span className={styles.recipesCount}>{recipesCount}</span>&nbsp;receptų
            </div>
        </div>
    );
};

export default InfoTab;