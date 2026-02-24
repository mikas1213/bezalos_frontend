import type { TargetProps } from './Signup/types';
export interface ApiErrorResponse {
	// status: 'fail';
	// message: string;
	// error: {
	// 	statusCode: number;
	// 	status: 'fail';
	// 	isOperational: boolean;
	// 	errors?: {
	// 		name?: string[];
	// 		email?: string[];
	// 		password?: string[];
	// 		passwordConfirmed?: string[];
	// 		initialTarget?: TargetProps[];
	// 		acceptTerms?: boolean[];
	// 	};
	// };

	message: string;
	errors?: {
		name?: string[];
		email?: string[];
		password?: string[];
		passwordConfirmed?: string[];
		initialTarget?: TargetProps[];
		acceptTerms?: boolean[];
	};
}
