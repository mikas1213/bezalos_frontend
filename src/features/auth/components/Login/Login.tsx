import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { useAuth } from "../../hooks/useAuth";
import { useAuthentication } from "../../hooks/useAuthentication";
import { FormInput } from "../FormInput";
import { SubmitButton } from "../SubmitButton";

import type { ApiErrorResponse, FormData, FormErrors, LoginProps } from "./types";

import styles from "./Login.module.scss";
export const Login = ({ onSuccess }: LoginProps) => {
    const { login } = useAuth();
    const { setAuthMode } = useAuthentication();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const validateForm = (data: FormData) => {
        const newErrors: FormErrors = {};
        if (!data.email.trim()) newErrors.email = "Neįvestas el. paštas";
        if (!data.password) newErrors.password = "Neįvestas slaptažodis";
        return newErrors;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const { mutate, isPending } = useMutation<void, AxiosError<ApiErrorResponse>, FormData>({
        mutationFn: async ({ email, password }) => {
            await login(email, password);
        },
        onSuccess: () => {
            toast.success("Prisijungimas sėkmingas!");
            if (onSuccess) {
                onSuccess();
            } else {
                navigate(from, { replace: true });
            }
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

            if (data?.error.errors) {
                setErrors(data?.error?.errors as FormErrors);
            } else {
                setErrors({
                    email: data?.message,
                });
            }
        },
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        mutate(formData);
    };

    return (
        <form className={styles.login} onSubmit={handleSubmit}>
            <FormInput
                type="email"
                name="email"
                label="El. paštas"
                placeholder="vardas@pavyzdys.lt"
                inputValue={formData.email}
                autoComplete="email"
                autoFocus={true}
                disabled={isPending}
                error={errors.email}
                handleChange={handleChange}
            />
            <FormInput
                type="password"
                name="password"
                label="Slaptažodis"
                placeholder="••••••••"
                inputValue={formData.password}
                autoComplete="current-password"
                disabled={isPending}
                error={errors.password}
                handleChange={handleChange}
            />

            <div className={styles.forgotPassword}>
                <button onClick={() => setAuthMode("forgot")} type="button" className={styles.forgotPasswordButton}>
                    Pamiršote slaptažodį?
                </button>
            </div>

            <SubmitButton type="submit" label="Prisijungti" disabled={isPending} isPending={isPending} />
        </form>
    );
};
