import { useEffect, useRef } from 'react';
import CountUp from 'react-countup';

import styles from './InfoTab.module.scss';

interface InfoTabProps {
	recipesCount: number;
}

export const InfoTab = ({ recipesCount }: InfoTabProps) => {
	const prevCount = useRef(0);
	useEffect(() => {
		prevCount.current = recipesCount;
	}, [recipesCount]);

	return (
		<div className={styles.infoTab}>
			<div className={styles.recipesInfo}>
				Iš viso rasta&nbsp;
				<span
					className={styles.recipesCount}
					style={{ minWidth: recipesCount < 10 ? '0.9rem' : recipesCount < 100 ? '1.2rem' : '2.4rem' }}
				>
					<CountUp
						key={recipesCount}
						start={prevCount.current}
						end={recipesCount}
						decimals={0}
						duration={0.5}
						separator=""
					/>
				</span>{' '}
				receptų
			</div>
		</div>
	);
};
