import styles from './Paslaugos.module.css';
import Card from './Card';

const Paslaugos = ({ paslaugos }) => {

    return (
        <div className={styles.paslaugos}>
            {paslaugos.map(paslauga => <Card key={paslauga.id} paslauga={paslauga} />)}
        </div>
    );
};

export default Paslaugos;