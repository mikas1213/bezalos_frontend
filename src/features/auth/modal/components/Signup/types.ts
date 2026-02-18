export type TargetProps = 'profilis' | 'virtuve' | 'abu' | 'nezinau';
export interface SignupFormData {
	name: string;
	email: string;
	password: string;
	passwordConfirmed: string;
	initialTarget: TargetProps;
	acceptTerms: boolean;
}

export interface SignupFormErrors {
	name?: string[];
	email?: string[];
	password?: string[];
	passwordConfirmed?: string[];
	initialTarget?: TargetProps[];
}
