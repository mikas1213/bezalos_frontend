import cx from 'classnames';

import { Box } from '../../../../../components/Shared';
import SpinnerOnBtn from '../../../../../components/Shared/SpinnerOnBtn';

import styles from './submitButton.module.scss';
export type SubmitLabels =
	| 'Prisijungti'
	| 'Registruotis'
	| 'Tęsti'
	| 'Siųsti nuorodą'
	| 'Pradėti naudotis'
	| 'Atidaryti el. paštą';
interface SubmitButton {
	type?: 'button' | 'submit';
	label: SubmitLabels;
	isPending?: boolean;
	disabled?: boolean;
	onClick?: () => void;
}

export const SubmitButton = ({
	type,
	label,
	isPending = false,
	disabled = false,
	onClick,
}: SubmitButton) => {
	return (
		<Box padding={['0rem', '0rem', '1rem', '0rem']}>
			<button
				type={type === 'submit' ? 'submit' : 'button'}
				disabled={disabled}
				onClick={onClick}
				className={styles.submit}
			>
				<span className={cx(isPending && styles.hidden)}>{label}</span>
				{isPending && <SpinnerOnBtn />}
			</button>
		</Box>
	);
};
