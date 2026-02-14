import styles from "./Authentication.module.scss";
// import { useState, type ChangeEvent } from "react";
// import { AuthenticationProvider } from '../../contexts/AuthenticationProvider';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Header } from "../Header";
import { Signup } from "../Signup";
import { InitialTarget } from "../InitialTarget";
import { Login } from '../Login';
import { Box } from '../../../../components/Shared';
import { FormInput } from '../FormInput';

interface AuthenticationProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export const Authentication = ({ onSuccess, onCancel }: AuthenticationProps) => {
    const { authMode, setAuthMode, formData, authActions, handleChange, handleSubmit } = useAuthentication();

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalTopDecoration} />
            <Box padding={["1.5rem", "2rem", "1.5rem", "2rem"]}>
                <Header onCancel={onCancel} />

                {authMode === "login" && <Login onSuccess={onSuccess} />}

                {authMode === "forgot" &&
                    <Box padding={["1.5rem", "0", "0", "0"]}>
                        <form id="auth-form" onSubmit={handleSubmit}>
                            <FormInput
                                type="email"
                                name="email"
                                label="El. paštas"
                                placeholder="vardas@pavyzdys.lt"
                                inputValue={formData.email}
                                autoComplete="email"
                                autoFocus={true}
                                handleChange={handleChange}
                            />
                        </form>
                    </Box>
                }

                {authMode === "signup" && <Signup /> }
                {authMode === "initialTarget" && <InitialTarget /> }

                {/* <Box padding={["1rem", "0rem", "1rem", "0rem"]}>
                    <button
                        type="submit"
                        form="auth-form"
                        disabled={authMode === "initialTarget" && (!formData.initialTarget || !formData.acceptTerms)}
                        className={styles.submit}
                    >
                        { authActions[authMode].btnLabel }
                    </button>
                </Box> */}

                <Box padding={["0", "2rem", "0rem", "2rem"]}>
                    <p className={styles.switchAuth}>
                        {authActions[authMode].authCta}{" "}
                        <button
                            type="button"
                            onClick={() => setAuthMode(authActions[authMode].authAction)}
                            className={styles.switchAuthButton}
                        >
                            { authActions[authMode].authCtaBtn}
                        </button>
                    </p>
                </Box>
            </Box>
        </div>
    );
};
