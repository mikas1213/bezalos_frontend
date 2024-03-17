import styles from './Main.module.css';

const Main = ({children, myRef}) => {
    return <main ref={myRef} className={styles.main}>{children}</main>;
};

export default Main;