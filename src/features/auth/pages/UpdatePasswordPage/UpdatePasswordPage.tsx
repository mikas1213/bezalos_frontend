import type { ChangeEvent, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { KeyRound } from 'lucide-react';

import { Box, Cluster } from '../../../../components/Shared';
import SpinnerOnBtn from '../../../../components/Shared/SpinnerOnBtn';
import { useAuth } from '../../core';
import { FormInput } from '../../modal/components/FormInput';
import { SubmitButton } from '../../modal/components/SubmitButton';
import type { ApiErrorResponse } from '../../modal/components/types';

import styles from './UpdatePasswordPage.module.scss';

interface FormData {
	password: string;
	passwordConfirmed: string;
}

interface FormErrors {
	password?: string[];
	passwordConfirmed?: string[];
}

export const UpdatePasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const { updatePassword, validateResetToken } = useAuth();

	const [isValidating, setIsValidating] = useState(true);
	const [formData, setFormData] = useState<FormData>({ password: '', passwordConfirmed: '' });
	const [errors, setErrors] = useState<FormErrors>({});

	useEffect(() => {
		if (!token) {
			navigate('/keisti-slaptazodi-klaida', { replace: true });
			return;
		}
		validateResetToken(token)
			.then(() => setIsValidating(false))
			.catch(() => navigate('/keisti-slaptazodi-klaida', { replace: true }));
	}, [token, validateResetToken, navigate]);

	const validateForm = (data: FormData) => {
		const newErrors: FormErrors = {};

		if (!data.password) {
			newErrors.password = ['Neįvestas slaptažodis'];
		} else if (data.password.length < 8) {
			newErrors.password = ['Slaptažodis turi būti ne trumpesnis nei 8 simboliai'];
		} else if (!/[a-z]/i.test(data.password)) {
			newErrors.password = ['Slaptažodį turi sudaryti bent viena raidė'];
		} else if (!/[0-9]/.test(data.password)) {
			newErrors.password = ['Slaptažodį turi sudaryti bent vienas skaičius'];
		}

		if (!data.passwordConfirmed) {
			newErrors.passwordConfirmed = ['Pakartokite slaptažodį'];
		} else if (data.password && data.passwordConfirmed !== data.password) {
			newErrors.passwordConfirmed = ['Slaptažodis nesutampa'];
		}

		return newErrors;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormErrors]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const { mutate, isPending } = useMutation<void, AxiosError<ApiErrorResponse>>({
		mutationFn: async () => {
			await updatePassword(token!, formData.password.trim(), formData.passwordConfirmed.trim());
		},
		onSuccess: () => {
			toast.success('Slaptažodis pakeistas sėkmingai!');
			navigate('/prisijungti');
		},
		onError: (err) => {
			const data = err?.response?.data;

			if (!err.response) {
				toast.error('Serveris nepasiekiamas. Patikrinkite interneto ryšį.');
				return;
			}
			if (err?.code === 'ECONNABORTED') {
				toast.error('Užklausa užtruko per ilgai. Bandykite dar kartą.');
				return;
			}
			if (data?.errors) {
				setErrors(data.errors as FormErrors);
			} else {
				toast.error(data?.message || 'Kažkas negerai. Bandykite dar kartą.');
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
		mutate();
	};

	if (isValidating) {
		return (
			<div className={styles.page}>
				<SpinnerOnBtn />
			</div>
		);
	}

	return (
		<div className={styles.page}>
			<div className={styles.card}>
				<div className={styles.topDecoration} />
				<Box padding={['1.5rem', '2rem']}>
					<Box padding={['2rem', '0']}>
						<Cluster justify="center">
							<Cluster justify="center" align="center" className={styles.headerIcon}>
								<KeyRound strokeWidth={1.6} />
							</Cluster>
						</Cluster>
					</Box>

					<Cluster dir="column" align="center">
						<h2 className={styles.title}>Atkurti slaptažodį</h2>
						<p className={styles.subtitle}>Įveskite naują slaptažodį</p>
					</Cluster>

					<form className={styles.form} onSubmit={handleSubmit}>
						<FormInput
							type="password"
							name="password"
							label="Naujas slaptažodis"
							placeholder="••••••••"
							inputValue={formData.password}
							autoComplete="new-password"
							autoFocus={true}
							disabled={isPending}
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
							disabled={isPending}
							errors={errors.passwordConfirmed}
							handleChange={handleChange}
						/>
						<SubmitButton
							type="submit"
							label="Tęsti"
							disabled={isPending}
							isPending={isPending}
						/>
					</form>
				</Box>
			</div>
		</div>
	);
};
