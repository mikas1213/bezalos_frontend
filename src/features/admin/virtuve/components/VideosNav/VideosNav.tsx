import { CirclePlus } from 'lucide-react';

import { Divider } from '../../../../../components/admin/nutrition_plans/Divider';

import type { VideosNavProps } from './types';

import styles from './VideosNav.module.scss';

export const VideosNav = ({ isModalOpen, setIsModalOpen, setFormValues }: VideosNavProps) => {
	return (
		<div className={styles.VideosNav}>
			<button
				type="button"
				disabled={isModalOpen.isOpen ? true : false}
				className={styles.addBtn}
				onClick={() => {
					setIsModalOpen({ isOpen: true, action: 'insert' });
					setFormValues((prev) => ({ ...prev, action: 'insert' }));
				}}
			>
				Naujas Video
				<CirclePlus className={styles.iconAdd} />
			</button>
			<Divider />
		</div>
	);
};
