import type { MouseEvent } from 'react';
export interface SelectProps {
	label: string;
	placeholder?: string;
	name: string;
	value: string;
	options: string[];
	dataValue?: string;
	className?: string;
	handleFormInput: (e: MouseEvent<HTMLDivElement>) => void;
}
