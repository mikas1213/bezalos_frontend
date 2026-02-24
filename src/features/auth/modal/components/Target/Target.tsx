import type { ComponentType, Dispatch, SetStateAction } from 'react';

import cx from 'classnames';
import { Check, type LucideProps } from 'lucide-react';

import type { TargetProps } from '../Signup/types';
import type { SignupFormData } from '../Signup/types';

import styles from './Target.module.scss';

interface GoalProps {
	target: {
		id: TargetProps;
		icon: ComponentType<LucideProps>;
		title: string;
		description: string;
	};
	formData: SignupFormData;
	setFormData: Dispatch<SetStateAction<SignupFormData>>;
}

export const Target = ({ target, formData, setFormData }: GoalProps) => {
	const Icon = target.icon;

	return (
		<button
			key={target.id}
			type="button"
			onClick={() => setFormData((prev) => ({ ...prev, initialTarget: target.id }))}
			className={cx(styles.target, formData.initialTarget === target.id && styles.selected)}
		>
			<div
				className={cx(
					styles.targetIcon,
					formData.initialTarget === target.id && styles.selected,
				)}
			>
				<Icon strokeWidth={1.5} />
			</div>

			<div className={styles.targetInfo}>
				<span className={styles.targetTitle}>{target.title}</span>
				<span className={styles.targetDescription}>{target.description}</span>
			</div>
			<div
				className={cx(
					styles.targetCheck,
					formData.initialTarget === target.id && styles.selected,
				)}
			>
				{formData.initialTarget === target.id && (
					<Check color="var(--white-100)" size={10} strokeWidth={3} />
				)}
			</div>
		</button>
	);
};
