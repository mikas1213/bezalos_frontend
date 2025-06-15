import styles from './ActionBtn.module.css';

const ActionBtn = ({ label, className }) => {
    return (
        <button className={`${className} ${styles.actionBtn}`}>{ label }</button>
    );
};

export default ActionBtn;