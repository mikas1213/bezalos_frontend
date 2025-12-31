import styles from './Button.module.css';
import type { ButtonProps } from './types';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

export const Button = ({ onClick, variant, disabled }: ButtonProps) => {
    const buttonClasses = [
        styles.button,
        styles[variant]
    ].join(' ');

    return (
        <button onClick={onClick} className={buttonClasses} disabled={disabled}>
            { variant === 'Atgal' && <ChevronLeft size={20} /> }
            { variant }
            { variant === 'Toliau' && <ChevronRight size={20} /> }
            { variant === 'Baigti' && <Check size={20} /> }

        </button>
    );
};
