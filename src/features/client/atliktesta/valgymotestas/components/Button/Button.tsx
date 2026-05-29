import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

import type { ButtonProps } from './types';

import styles from './Button.module.scss';

export const Button = ({ onClick, variant, disabled }: ButtonProps) => {
	const buttonClasses = [styles.button, styles[variant]].join(' ');

	return (
		<button type="button" onClick={onClick} className={buttonClasses} disabled={disabled}>
			{variant === 'Atgal' && <ChevronLeft size={20} />}
			{variant}
			{variant === 'Toliau' && <ChevronRight size={20} />}
			{variant === 'Baigti' && <Check size={20} />}
		</button>
	);
};
