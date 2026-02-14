import { type ChangeEvent, useState } from 'react';

import { Eye, EyeClosed } from 'lucide-react';

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
	error: string | undefined;
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
	error,
	handleChange,
}: FormInputProps) => {
	const [show, setShow] = useState(false);

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
					onFocus={(e) => {
						e.target.style.borderColor = '#084747';
						e.target.style.backgroundColor = '#ffffff';
					}}
					onBlur={(e) => {
						e.target.style.borderColor = '#e5e7eb';
						e.target.style.backgroundColor = '#f9fafb';
					}}
				/>

				{type === 'password' && (
					<span onClick={() => setShow((open) => !open)} className={styles.eye}>
						{show ? <Eye size={20} /> : <EyeClosed size={20} />}
					</span>
				)}
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};
