import styles from './MainContainer.module.css';

const MainContainer = ({children, customClass = ''}) => {
    const sectionClasses = `${styles.mainContainer} ${customClass}`;
    
    return (
        <div className={sectionClasses}>
            {children}
        </div>
    );
};

export default MainContainer;