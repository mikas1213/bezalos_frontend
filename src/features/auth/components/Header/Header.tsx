import styles from "./Header.module.scss";
import cx from "classnames";
import { X } from "lucide-react";
import { Logo } from "../../../../components/Shared/Logo";
import { useAuthentication } from '../../hooks/useAuthentication';

export const Header = ({ onCancel }: {  onCancel: () => void }) => {
    const { authMode, authActions } = useAuthentication();

    return (
        <>
            <button type="button" onClick={onCancel} className={styles.closeButton}>
                <X size={18} color="var(--dark-green-500)" />
            </button>

            <div className={styles.logoContainer}>
                <Logo />
            </div>

            <h2 className={styles.authTitle}>
                { authActions[authMode].title }
            </h2>

            <p className={styles.authSubTitle}>
                { authActions[authMode].subTitle }
            </p>

            {["signup", "initialTarget"].includes(authMode) && (
                <div className={styles.progressBar}>
                    <div className={cx(styles.step, styles.fill)} />
                    <div
                        className={cx(styles.step, authMode === "initialTarget" && styles.fill)}
                    />
                </div>
            )}
        </>
    );
};
