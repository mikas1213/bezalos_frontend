import { type ChangeEvent, type FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { useAuth } from '../../../core';
import { useAuthentication } from '../../hooks/useAuthentication';
import { FormInput } from '../FormInput';
import { SubmitButton } from '../SubmitButton';
import type { ApiErrorResponse } from '../types';

import type { ForgotPasswordProps, FormData, FormErrors } from './types';

import styles from './ForgotPassword.module.scss';

export const ForgotPassword = ({ setUserEmail }: ForgotPasswordProps) => {
	const { forgotPassword } = useAuth();
	const [formData, setFormData] = useState<FormData>({ email: '' });
	const [errors, setErrors] = useState<FormErrors>({});
	const { setAuthMode } = useAuthentication();

	const validateForm = (data: FormData) => {
		const newErrors: FormErrors = {};
		if (!data.email.trim()) newErrors.email = 'Neįvestas el. paštas';
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
		mutationFn: async ({ email }) => {
			setUserEmail(email);
			await forgotPassword(email);
		},
		onSuccess: () => {
			setAuthMode('forgotSuccess');
		},
		onError: (err) => {
			const data = err?.response?.data;

			if (!err.response) {
				toast.error('Serveris nepasiekiamas. Patikrinkite interneto ryšį.');
				return;
			}

			if (err.code === 'ECONNABORTED') {
				toast.error('Užklausa užtruko per ilgai. Bandykite dar kartą.');
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
		<form id="auth-form" onSubmit={handleSubmit} className={styles.forgotPassword}>
			<FormInput
				type="email"
				name="email"
				label="El. paštas"
				placeholder="vardas@pavyzdys.lt"
				inputValue={formData.email}
				autoComplete="email"
				autoFocus={true}
				errors={errors.email}
				handleChange={handleChange}
			/>
			<SubmitButton
				type="submit"
				label="Siųsti nuorodą"
				disabled={isPending}
				isPending={isPending}
			/>
		</form>
	);
};
