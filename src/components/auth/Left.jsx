import styles from "./Left.module.css";

import { useContext } from "react";
import { FormStateContext } from "./Authentication";

const FormLeft = () => {
    const { formState, setFormState } = useContext(FormStateContext);

    return (
        <div className={styles.left}>
            <h1 className={styles.title}>Labas!</h1>
            <div className={styles.message}>
                <h3>Liko tik vienas žingsnis iki tavo</h3>
                <h3>ilgalaikių pokyčių starto</h3>
            </div>

            {formState === "signin" && (
                <div className={styles.action}>
                    <h4>Dar neturi paskyros?</h4>
                    <button onClick={() => setFormState("signup")}>
                        REGISTRUOTIS
                    </button>
                </div>
            )}
            {(formState === "signup" ||
                formState === "forgot" ||
                formState === "success") && (
                <div className={styles.action}>
                    <h4>Jau turi paskyrą?</h4>
                    <button onClick={() => setFormState("signin")}>
                        PRISIJUNGTI
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormLeft;
