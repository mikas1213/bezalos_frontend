import type { InputProps } from './types';

import styles from './Input.module.scss';

const Input = ({ label, placeholder, name, value, dataValue = '', handleFormInput, className = '' }: InputProps) => {
	return (
		<div className={`${styles.inputGroup} ${className}`}>
			<span className={styles.inputLabel}>{label}</span>
			<input
				type="text"
				name={name}
				value={value}
				onChange={handleFormInput}
				data-id={dataValue}
				className={styles.input}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
