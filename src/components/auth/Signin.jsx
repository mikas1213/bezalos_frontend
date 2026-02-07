import styles from "./Signin.module.css";
import { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { PiUserCircleDuotone } from "react-icons/pi";
import { RiEyeCloseLine } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import Spinner from "../UI/Spinner";
import { useAuth } from "../../features/auth";
import { FormStateContext } from "./Authentication";
import toast from "react-hot-toast";

const Signin = ({ onSuccess }) => {
    const [eyeOne, setEyeOne] = useState(false);
    const { login } = useAuth();
    const { setFormState } = useContext(FormStateContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const {
        register,
        formState: { errors },
        setError,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ email, password }) => {
            await login(email, password);
        },
        onSuccess: () => {
            toast.success("Prisijungimas sėkmingas!");
            // If onSuccess callback exists (from modal), call it
            // Otherwise navigate to the original destination
            if (onSuccess) {
                onSuccess();
            } else {
                navigate(from, { replace: true });
            }
        },
        onError: (err) => {
            const responseData = err?.response?.data;
            // Handle both error formats: { errors: [{type, msg}] } and { message: "..." }
            if (responseData?.errors && responseData.errors[0]) {
                const { type, msg } = responseData.errors[0];
                setError("email", { type, message: msg });
            } else {
                setError("email", { type: "server", message: responseData?.message || "Prisijungti nepavyko" });
            }
        },
    });

    const submit = ({ email, password }) => {
        mutate({
            email: email?.toLowerCase(),
            password,
        });
    };

    return (
        <div className={styles.right}>
            {isPending && <Spinner />}
            <form className={styles.signin} onSubmit={handleSubmit(submit)}>
                <div className={styles.header}>
                    <PiUserCircleDuotone className={styles.icon} />
                </div>

                <div className={styles.inputs}>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type="email"
                                placeholder="El. paštas"
                                className={
                                    (errors.email || errors.auth) &&
                                    styles.invalid
                                }
                                {...register("email", {
                                    required: "Neįvestas el. paštas",
                                })}
                                autoComplete="off"
                            />
                            <FaEnvelope className={styles.icon} />
                        </div>
                        {errors.email && (
                            <span className={styles.inputError}>
                                {errors?.email?.message}
                            </span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input
                                type={eyeOne ? "text" : "password"}
                                placeholder="Slaptažodis"
                                className={
                                    (errors.password ||
                                        (errors.email &&
                                            errors?.email?.type == "server")) &&
                                    styles.invalid
                                }
                                {...register("password", {
                                    required: "Neįvestas slaptažodis",
                                })}
                                autoComplete="off"
                            />

                            <FaLock className={styles.icon} />
                            <div
                                className={styles.eyeIconContainer}
                                onClick={() => setEyeOne((on) => !on)}
                            >
                                {eyeOne ? (
                                    <BsEyeFill className={styles.eyeIcon} />
                                ) : (
                                    <RiEyeCloseLine
                                        className={styles.eyeIcon}
                                    />
                                )}
                            </div>
                        </div>
                        {(errors.password ||
                            (errors.email &&
                                errors.email.type == "server")) && (
                            <span className={styles.inputError}>
                                {errors?.password?.message ||
                                    errors?.email?.message}
                            </span>
                        )}

                        <div className={styles.primintiSlaptazodi}>
                            <p onClick={() => setFormState("forgot")}>
                                Priminti slaptažodį
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <button disabled={isPending ? true : false}>
                        {isPending ? "PALAUKITE..." : "PRISIJUNGTI"}
                    </button>
                </div>

                <div
                    className={styles.signUpMobile}
                    onClick={() => setFormState("signup")}
                >
                    <span>Dar neturi paskyros?</span>
                    <span>Registruotis</span>
                </div>
            </form>
        </div>
    );
};

export default Signin;
