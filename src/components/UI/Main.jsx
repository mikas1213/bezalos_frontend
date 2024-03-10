import styles from './Main.module.css';

const Main = ({children, myRef}) => {
    return <main ref={myRef} className={styles.main}>{children}</main>;
};

// const Main = ({children, isHome = false, myRef}) => {
//     return <main ref={myRef} className={`${styles.main} ${isHome ? styles.mainBgr : ''}`}>{children}</main>;
// };

export default Main;