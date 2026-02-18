import type { Dispatch, SetStateAction } from 'react';
export interface FormData {
	email: string;
}

export interface FormErrors {
	email?: string;
}

export interface ForgotPasswordProps {
	setUserEmail: Dispatch<SetStateAction<string | undefined>>;
}
