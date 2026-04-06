import styles from './Buttons.module.css';
interface ButtonProps {
	label: string;
	className: string;
	uploading?: boolean;
	onClick?: () => void;
}
export const ButtonCancel = ({ label, className = '', uploading, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			disabled={uploading}
			className={`${styles.button} ${styles.cancelButton} ${className}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export const ButtonSave = ({ label, className = '', uploading, onClick }: ButtonProps) => {
	return (
		<button
			type="button"
			disabled={uploading}
			className={`${styles.button} ${styles.saveButton} ${className}`}
			onClick={onClick}
		>
			{label}
		</button>
	);
};
