import styles from './ActionBtns.module.css';

const ActionBtns = ({ setOpen }) => {
    return (
        <div className={styles.actionBtns}>
            <button className={styles.saveBtn}>Išsaugoti</button>
            <button className={styles.cancelBtn} onClick={() => setOpen(false)}>Atšaukti</button>
        </div>
    );
};

export default ActionBtns;