import styles from './Main.module.css';

const Main = ({children, myRef, page = ''}) => {
    return <main ref={myRef} className={`${styles.main} ${page ? styles[page] : ''}`}>{children}</main>;
};

export default Main;