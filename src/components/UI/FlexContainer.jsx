import styles from './FlexContainer.module.css';

const FlexContainer = ({children, className}) => {
    const myClass = `${styles.flexContainer} ${className}`;
    return (
        <div className={myClass}>
            {children}
        </div>
    );
}

export default FlexContainer;