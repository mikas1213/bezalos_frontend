import type { Dispatch, SetStateAction } from 'react';

import cx from 'classnames';
import { ArrowLeft, Check } from 'lucide-react';

import { useAuthentication } from '../../hooks/useAuthentication';
import type { SignupFormData } from '../Signup/types';
import { Target } from '../Target';

import { targets } from './constants';

import styles from './InitialTarget.module.scss';

interface InitialTargetProps {
	setFormData: Dispatch<SetStateAction<SignupFormData>>;
	formData: SignupFormData;
}

export const InitialTarget = ({ setFormData, formData }: InitialTargetProps) => {
	const { setAuthMode } = useAuthentication();
	return (
		<>
			<button
				type="button"
				onClick={() => {
					setAuthMode('signup');
					setFormData((prev: SignupFormData) => ({ ...prev, acceptTerms: false }));
				}}
				className={styles.back}
			>
				<ArrowLeft size={16} />
				Atgal
			</button>

			<div className={styles.targets}>
				{targets.map((target) => (
					<Target key={target.id} target={target} formData={formData} setFormData={setFormData} />
				))}
			</div>
			<div className={styles.termsContainer}>
				<div className={styles.checkboxContainer}>
					<input
						type="checkbox"
						name="acceptTerms"
						checked={formData.acceptTerms}
						onChange={() => setFormData((prev) => ({ ...prev, acceptTerms: !prev.acceptTerms }))}
						className={cx(styles.checkBox, formData.acceptTerms && styles.selected)}
					/>
					{formData.acceptTerms && (
						<Check className={styles.checkIcon} size={16} color="var(--white-100)" strokeWidth="3" />
					)}
				</div>

				<div className={styles.termsLabel}>
					Sutinku su{' '}
					<a href="/pirkimo-taisykles" target="_blank" rel="noopener noreferrer" className={styles.termsLink}>
						pirkimo taisyklės
					</a>{' '}
					ir{' '}
					<a href="/privatumo-politika" target="_blank" rel="noopener noreferrer" className={styles.termsLink}>
						privatumo politika
					</a>
				</div>
			</div>
		</>
	);
};
