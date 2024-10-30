import styles from './AddNewBtn.module.css';

export const AddNewBtn = ({ label, Icon, onHandleClick }) => {

    return (
        <div 
            className={styles.addNewBtn}
            onClick={onHandleClick}
        >
            <Icon className={styles.icon} />
            <span>{ label }</span>
        </div>
    );
};