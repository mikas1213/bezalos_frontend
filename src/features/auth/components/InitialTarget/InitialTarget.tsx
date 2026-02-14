import styles from "./InitialTarget.module.scss";
import { targets } from "./constants";
import { Target } from "../Target";
import cx from "classnames";
import { ArrowLeft, Check } from "lucide-react";
import { useAuthentication } from '../../hooks/useAuthentication';

export const InitialTarget = () => {
    const { handleChange, setAuthMode, formData, setFormData, handleSubmit } = useAuthentication();

    return (

        <form onSubmit={handleSubmit} id="auth-form">
            <button
                type="button"
                onClick={() => {
                    setAuthMode("signup");
                    setFormData(prev => ({ ...prev, acceptTerms: false }));
                }}
                className={styles.back}
            >
                <ArrowLeft size={16} />
                Atgal
            </button>

            <div className={styles.targets}>
                {targets.map((target) => (
                    <Target key={target.id} target={target} />
                ))}
            </div>

            <div className={styles.termsContainer}>
                <div className={styles.checkboxContainer}>
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className={cx(styles.checkBox, formData.acceptTerms && styles.selected)}

                    />
                    {formData.acceptTerms && (
                        <Check
                            className={styles.ckeckIcon}
                            size={16}
                            color="var(--white-100)"
                            strokeWidth="3"
                        />
                    )}
                </div>

                <div className={styles.termsLabel}>
                    Sutinku su{" "}
                    <a href="#" className={styles.termsLink}>
                        naudojimo sąlygomis
                    </a>{" "}
                    ir{" "}
                    <a href="#" className={styles.termsLink}>
                        privatumo politika
                    </a>
                </div>
            </div>
        </form>
    );
};
