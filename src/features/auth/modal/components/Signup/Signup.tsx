import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import cx from "classnames";

import { Box, Cluster } from "../../../../../components/Shared";
import { useAuth } from "../../../core";
import { FormInput } from "../FormInput";
import { InitialTarget } from "../InitialTarget";
import { SubmitButton } from "../SubmitButton";
import type { ApiErrorResponse } from "../types";

import type { SignupFormData, SignupFormErrors } from "./types";

import styles from "./Signup.module.scss";
export const Signup = () => {
    const { signup } = useAuth();
    const [step, setStep] = useState<1 | 2>(1);
    const [errors, setErrors] = useState<SignupFormErrors>({});

    const [formData, setFormData] = useState<SignupFormData>({
        name: "",
        email: "",
        password: "",
        passwordConfirmed: "",
        initialTarget: "abu",
        acceptTerms: false,
    });

    const validateName = (name: string) => {
        if (!name.trim()) return "Vardas yra privalomas";
        if (name.trim().length < 2) return "Vardas turi būti bent 2 simbolių";
        return "";
    };
    const validateEmail = (email: string) => {
        if (!email.trim()) return "El. paštas yra privalomas";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Neteisingas el. pašto formatas";
        return "";
    };
    const validatePassword = (password: string) => {
        if (!password) return "Slaptažodis yra privalomas";
        if (password.length < 8) return "Slaptažodis turi būti bent 8 simbolių";
        return "";
    };
    const validateConfirmPassword = (confirmPassword: string, password: string) => {
        if (!confirmPassword) return "Pakartokite slaptažodį";
        if (confirmPassword !== password) return "Slaptažodžiai nesutampa";
        return "";
    };
    const validateForm = () => {
        const newErrors: SignupFormErrors = {};

        const nameError = validateName(formData.name);
        if (nameError) newErrors.name = [nameError];

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = [emailError];

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = [passwordError];

        const confirmError = validateConfirmPassword(formData.passwordConfirmed, formData.password);
        if (confirmError) newErrors.passwordConfirmed = [confirmError];

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => {
            const next = { ...prev, [name]: value };

            if (name === 'passwordConfirmed' && value) {
                const error = validateConfirmPassword(value, prev.password);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    passwordConfirmed: error ? [error] : undefined,
                }));
            } else if (name === 'password' && prev.passwordConfirmed) {
                const error = validateConfirmPassword(prev.passwordConfirmed, value);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    password: undefined,
                    passwordConfirmed: error ? [error] : undefined,
                }));
            } else if (errors[name as keyof SignupFormErrors]) {
                setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
            }

            return next;
        });
    };

    const { mutate, isPending } = useMutation<void, AxiosError<ApiErrorResponse>, SignupFormData>({
        mutationFn: async ({ name, email, password, passwordConfirmed, initialTarget }) => {
            await signup({ name, email, password, passwordConfirmed, initialTarget });
        },
        onError: (err) => {
            const data = err?.response?.data;
            console.log(data);

            if (data?.error.errors) {
                setErrors(data?.error?.errors as SignupFormErrors);
            } else if (data?.error.statusCode === 409) {
                setErrors({
                    email: [data?.message || "Kažkas negerai"],
                });
            }

            setFormData((prev) => ({ ...prev, acceptTerms: false }));
            setStep(1);
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step === 1) {
            if (validateForm()) {
                setStep(2);
            }
        } else if (step === 2) {
            mutate(formData);
        }
    };

    return (
        <>
            <div className={styles.progressBar}>
                <div className={cx(styles.step, styles.fill)} />
                <div className={cx(styles.step, step === 2 && styles.fill)} />
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <Box padding={["1.5rem", "0"]}>
                        <Cluster dir="column" gap="1rem">
                            <FormInput
                                type="text"
                                name="name"
                                label="Vardas"
                                placeholder="Vardas"
                                inputValue={formData.name}
                                autoComplete="given-name"
                                autoFocus={true}
                                errors={errors.name}
                                handleChange={handleChange}
                            />
                            <FormInput
                                type="email"
                                name="email"
                                label="El. paštas"
                                placeholder="vardas@pavyzdys.lt"
                                inputValue={formData.email}
                                autoComplete="email"
                                errors={errors.email}
                                handleChange={handleChange}
                            />
                            <FormInput
                                type="password"
                                name="password"
                                label="Slaptažodis"
                                placeholder="Mažiausiai 8 simboliai"
                                inputValue={formData.password}
                                autoComplete="new-password"
                                errors={errors.password}
                                handleChange={handleChange}
                            />
                            <FormInput
                                type="password"
                                name="passwordConfirmed"
                                label="Pakartokite slaptažodį"
                                placeholder="••••••••"
                                inputValue={formData.passwordConfirmed}
                                autoComplete="new-password"
                                errors={errors.passwordConfirmed}
                                handleChange={handleChange}
                            />
                        </Cluster>
                    </Box>
                )}
                {step === 2 && <InitialTarget formData={formData} setFormData={setFormData} setStep={setStep} />}
                <SubmitButton
                    label={step === 1 ? "Tęsti" : "Registruotis"}
                    type="submit"
                    isPending={isPending}
                    disabled={step === 2 && (!formData.initialTarget || !formData.acceptTerms)}
                />
            </form>
        </>
    );
};
