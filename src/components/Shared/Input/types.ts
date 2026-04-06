import type { ChangeEvent } from 'react';
export interface InputProps {
	label: string;
	placeholder?: string;
	name: string;
	value: string;
	dataValue?: string;
	className?: string;
	handleFormInput: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
