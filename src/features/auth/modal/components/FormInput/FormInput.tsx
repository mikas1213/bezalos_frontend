import { type ChangeEvent, useState } from 'react';

import { CircleAlert, Eye, EyeClosed } from 'lucide-react';

import { Cluster } from '../../../../../components/Shared';

import styles from './FormInput.module.scss';

interface FormInputProps {
	type: string;
	name: string;
	label: string;
	placeholder: string;
	inputValue: string;
	autoComplete: string;
	autoFocus?: boolean;
	disabled?: boolean;
	errors: string[] | undefined;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput = ({
	type,
	name,
	label,
	placeholder,
	inputValue,
	autoComplete,
	autoFocus = false,
	disabled = false,
	errors,
	handleChange,
}: FormInputProps) => {
	const [show, setShow] = useState(false);
	const hasError = !!errors?.length;

	return (
		<div className={styles.inputGroup}>
			<span>{label}</span>
			<div className={styles.inputContainer}>
				<input
					type={type === 'password' ? (show ? 'text' : type) : type}
					name={name}
					value={inputValue}
					onChange={handleChange}
					placeholder={placeholder}
					autoComplete={autoComplete}
					autoFocus={autoFocus}
					disabled={disabled}
					style={
						hasError
							? { borderColor: 'var(--red-400)', backgroundColor: 'var(--red-050)' }
							: undefined
					}
					onFocus={(e) => {
						if (hasError) {
							e.target.style.borderColor = 'var(--red-400)';
							e.target.style.backgroundColor = '#fef2f2';
						} else {
							e.target.style.borderColor = '#084747';
							e.target.style.backgroundColor = '#ffffff';
						}
					}}
					onBlur={(e) => {
						if (hasError) {
							e.target.style.borderColor = 'var(--red-400)';
							e.target.style.backgroundColor = '#fef2f2';
						} else {
							e.target.style.borderColor = '#e5e7eb';
							e.target.style.backgroundColor = '#f9fafb';
						}
					}}
				/>

				{type === 'password' && (
					<span onClick={() => setShow((open) => !open)} className={styles.eye}>
						{show ? <Eye size={20} /> : <EyeClosed size={20} />}
					</span>
				)}
			</div>

			{errors?.map((error, i) => (
				<Cluster key={`${i + error}`} gap="0.25rem" align="center">
					<CircleAlert color="var(--red-500)" size={14} />
					<p className={styles.error}>{error}</p>
				</Cluster>
			))}
		</div>
	);
};
