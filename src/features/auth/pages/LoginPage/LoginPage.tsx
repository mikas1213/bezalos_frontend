import type { ChangeEvent, FormEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import cx from "classnames";
import { ArrowLeft, ExternalLink, KeyRound, Lock, MailCheck, UserCheck } from "lucide-react";

import { Box, Cluster } from "../../../../components/Shared";
import { useAuth } from "../../core";
import { FormInput } from "../../modal/components/FormInput";
import { InfoBox } from "../../modal/components/InfoBox";
import { SubmitButton } from "../../modal/components/SubmitButton";
import type { ApiErrorResponse } from "../../modal/components/types";

import styles from "./LoginPage.module.scss";

type View = "login" | "forgot" | "forgotSuccess" | "denied";

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginFormErrors {
    email?: string[];
    password?: string[];
}

interface ForgotFormErrors {
    email?: string[];
}

export const LoginPage = () => {
    const { login, forgotPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [view, setView] = useState<View>("login");
    const [loginForm, setLoginForm] = useState<LoginFormData>({ email: "", password: "" });
    const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotErrors, setForgotErrors] = useState<ForgotFormErrors>({});
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        if (view !== "denied" || secondsLeft <= 0) return;
        const timer = setTimeout(() => {
            const next = secondsLeft - 1;
            setSecondsLeft(next);
            if (next <= 0) {
                setView("login");
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [view, secondsLeft]);

    const startLockout = useCallback((lockoutSeconds: number) => {
        if (lockoutSeconds <= 0) {
            toast.error("Per daug bandymų. Bandykite vėliau.");
            return;
        }
        setSecondsLeft(lockoutSeconds);
        setView("denied");
    }, []);

    const loginMutation = useMutation<void, AxiosError<ApiErrorResponse>, LoginFormData>({
        mutationFn: async ({ email, password }) => {
            await login(email, password);
        },
        onSuccess: () => {
            toast.success("Prisijungimas sėkmingas!");
            navigate(from, { replace: true });
        },
        onError: (err) => {
            const data = err?.response?.data;

            if (!err.response) {
                toast.error("Serveris nepasiekiamas. Patikrinkite interneto ryšį.");
                return;
            }
            if (err?.code === "ECONNABORTED") {
                toast.error("Užklausa užtruko per ilgai. Bandykite dar kartą.");
                return;
            }
            if (err.status === 429) {
                const message = data?.message ?? "";
                const match = message.match(/Please try again in (\d+) seconds/);
                const seconds = match ? parseInt(match[1], 10) : 0;
                startLockout(seconds);
                return;
            }
            if (err.status === 401) {
                setLoginErrors({ email: [data?.message || "Kažkas negerai"] });
            } else if (data?.errors) {
                setLoginErrors(data?.errors as LoginFormErrors);
            }
        },
    });

    const forgotMutation = useMutation<void, AxiosError<ApiErrorResponse>, string>({
        mutationFn: async (email) => {
            await forgotPassword(email);
        },
        onSuccess: () => {
            setView("forgotSuccess");
        },
        onError: (err) => {
            const data = err?.response?.data;
            if (!err.response) {
                toast.error("Serveris nepasiekiamas. Patikrinkite interneto ryšį.");
                return;
            }
            if (err.code === "ECONNABORTED") {
                toast.error("Užklausa užtruko per ilgai. Bandykite dar kartą.");
                return;
            }
            if (data?.errors) {
                setForgotErrors(data?.errors as ForgotFormErrors);
            } else {
                setForgotErrors({ email: [data?.message || "Kažkas negerai"] });
            }
        },
    });

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
        if (loginErrors[name as keyof LoginFormErrors]) {
            setLoginErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: LoginFormErrors = {};
        if (!loginForm.email.trim()) newErrors.email = ["Neįvestas el. paštas"];
        if (!loginForm.password) newErrors.password = ["Neįvestas slaptažodis"];
        if (Object.keys(newErrors).length > 0) {
            setLoginErrors(newErrors);
            return;
        }
        setLoginErrors({});
        loginMutation.mutate(loginForm);
    };

    const handleForgotChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForgotEmail(e.target.value);
        if (forgotErrors.email) {
            setForgotErrors({});
        }
    };

    const handleForgotSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!forgotEmail.trim()) {
            setForgotErrors({ email: ["Neįvestas el. paštas"] });
            return;
        }
        setForgotErrors({});
        forgotMutation.mutate(forgotEmail);
    };

    const switchToForgot = () => {
        setForgotEmail(loginForm.email);
        setForgotErrors({});
        setView("forgot");
    };

    const switchToLogin = () => {
        setLoginErrors({});
        setView("login");
    };

    const maskedEmail = forgotEmail.replace(
        /^(.{2})(.*)(@.*)$/,
        (_, start, middle, domain) => start + "•".repeat(middle.length) + domain,
    );

    const isDenied = view === "denied";
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const headerConfig: Record<Exclude<View, "denied">, { icon: typeof UserCheck; title: string; subtitle: string }> = {
        login: { icon: UserCheck, title: "Sveiki sugrįžę", subtitle: "Prisijunkite prie savo paskyros" },
        forgot: {
            icon: KeyRound,
            title: "Pamiršote slaptažodį?",
            subtitle: "Įveskite savo el. pašto adresą ir mes atsiųsime nuorodą slaptažodžiui atkurti",
        },
        forgotSuccess: {
            icon: MailCheck,
            title: "Patikrinkite el. paštą",
            subtitle: `Slaptažodžio atkūrimo nuoroda išsiųsta adresu ${maskedEmail}`,
        },
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <div className={cx(styles.topDecoration, isDenied && styles.topDecorationDenied)} />
                <Box padding={["1.5rem", "2rem"]}>
                    {isDenied ? (
                        <>
                            <div className={styles.deniedTitleWrapper}>
                                <h2 className={styles.deniedTitle}>Prisijungimas užblokuotas</h2>
                            </div>
                            <p className={styles.deniedSubtitle}>Per daug nesėkmingų bandymų</p>

                            <div className={styles.lockIconWrapper}>
                                <div className={styles.lockIconCircle}>
                                    <Lock />
                                </div>
                            </div>

                            <div className={styles.countdownWrapper}>
                                <span className={styles.countdown}>
                                    {minutes}:{seconds.toString().padStart(2, "0")}
                                </span>
                            </div>
                            <p className={styles.countdownLabel}>Palaukite, kol galėsite bandyti dar kartą</p>

                            <InfoBox
                                title="Kodėl tai nutiko?"
                                subTitle="Po kelių nesėkmingų bandymų, dėl saugumo priežasčių prisijungimas laikinai užblokuotas. Tai apsaugo jūsų paskyrą nuo neleistinos prieigos."
                                isDenied={true}
                            />

                            <button type="button" onClick={switchToForgot} className={styles.deniedForgotButton}>
                                Pamiršau slaptažodį
                            </button>
                        </>
                    ) : (
                        <>
                            <Box padding={["2rem", "0"]}>
                                <Cluster justify="center">
                                    <Cluster justify="center" align="center" className={styles.headerIcon}>
                                        {(() => {
                                            const Icon = headerConfig[view].icon;
                                            return <Icon strokeWidth={1.6} />;
                                        })()}
                                    </Cluster>
                                </Cluster>
                            </Box>

                            <Cluster dir="column" align="center">
                                <h2 className={styles.title}>{headerConfig[view].title}</h2>
                                <p className={styles.subtitle}>{headerConfig[view].subtitle}</p>
                            </Cluster>
                        </>
                    )}

                    {view === "login" && (
                        <form className={styles.form} onSubmit={handleLoginSubmit}>
                            <FormInput
                                type="email"
                                name="email"
                                label="El. paštas"
                                placeholder="vardas@email.lt"
                                inputValue={loginForm.email}
                                autoComplete="email"
                                autoFocus={true}
                                disabled={loginMutation.isPending}
                                errors={loginErrors.email}
                                handleChange={handleLoginChange}
                            />
                            <FormInput
                                type="password"
                                name="password"
                                label="Slaptažodis"
                                placeholder="••••••••"
                                inputValue={loginForm.password}
                                autoComplete="current-password"
                                disabled={loginMutation.isPending}
                                errors={loginErrors.password}
                                handleChange={handleLoginChange}
                            />
                            <div className={styles.forgotPassword}>
                                <button type="button" onClick={switchToForgot} className={styles.forgotPasswordButton}>
                                    Pamiršote slaptažodį?
                                </button>
                            </div>
                            <SubmitButton
                                type="submit"
                                label="Prisijungti"
                                disabled={loginMutation.isPending}
                                isPending={loginMutation.isPending}
                            />
                        </form>
                    )}

                    {view === "forgot" && (
                        <>
                            <form className={styles.form} onSubmit={handleForgotSubmit}>
                                <FormInput
                                    type="email"
                                    name="email"
                                    label="El. paštas"
                                    placeholder="vardas@email.lt"
                                    inputValue={forgotEmail}
                                    autoComplete="email"
                                    autoFocus={true}
                                    disabled={forgotMutation.isPending}
                                    errors={forgotErrors.email}
                                    handleChange={handleForgotChange}
                                />
                                <SubmitButton
                                    type="submit"
                                    label="Siųsti nuorodą"
                                    disabled={forgotMutation.isPending}
                                    isPending={forgotMutation.isPending}
                                />
                            </form>
                            <Cluster justify="center" className={styles.backToLogin}>
                                <button type="button" onClick={switchToLogin} className={styles.backToLoginButton}>
                                    <ArrowLeft size={16} />
                                    Grįžti į prisijungimą
                                </button>
                            </Cluster>
                        </>
                    )}

                    {view === "forgotSuccess" && (
                        <div className={styles.form}>
                            <a
                                href="https://mail.google.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.openEmailButton}
                            >
                                <ExternalLink size={18} />
                                Atidaryti el. paštą
                            </a>
                            <Cluster justify="center" className={styles.backToLogin}>
                                <button type="button" onClick={switchToLogin} className={styles.backToLoginButton}>
                                    <ArrowLeft size={16} />
                                    Grįžti į prisijungimą
                                </button>
                            </Cluster>
                        </div>
                    )}
                </Box>
            </div>
        </div>
    );
};
