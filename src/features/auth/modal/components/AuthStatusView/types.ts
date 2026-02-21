import type { AuthMode } from '../../contexts/authentication.types';
import type { SubmitLabels } from '../SubmitButton/SubmitButton';
interface SuccessContent {
	title: string;
	subTitle: string;
	infoTitle: string;
	infoDescription: string;
	boldWord: string;
	submitLabel: SubmitLabels;
	submitMode: AuthMode;
	footerLabel: string;
	actionLabel: string;
	actionMode: AuthMode;
}
export type Field = Exclude<
	AuthMode,
	'login' | 'signup' | 'loginDenied' | 'forgot' | 'initialTarget' | 'signupDenied'
>;
export type AuthStatusViewProps = Record<Field, SuccessContent>;
