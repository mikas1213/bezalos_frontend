import styles from './FormLeft.module.css';


const FormLeft = () => {
    return (
        <div className={styles.FormLeft}>
            <h1>Labas!</h1>
            <div>
                <h3>Liko tik vienas žingsnis iki tavo</h3>
                <h3>ilgalaikių pokyčių starto</h3>
            </div>
            <h4>Jau turi paskyrą?</h4>

            <button>PRISIJUNGTI</button>
        </div>
    );
};

export default FormLeft;