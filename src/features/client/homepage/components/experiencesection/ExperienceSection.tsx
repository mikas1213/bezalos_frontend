import { Cluster, Container } from '../../../../../components/Shared';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import { useIsMounted } from '../../../../../hooks';

import styles from './ExperienceSection.module.css';

type Experience = {
	value: '8m+' | '1,7k+' | '85+' | '1,3k+';
	desc: 'darbo patirtis' | 'laimingų klientų' | 'mentorystės istorijos' | 'mitybos planų';
};

const experiences: Experience[] = [
	{ value: '8m+', desc: 'darbo patirtis' },
	{ value: '1,7k+', desc: 'laimingų klientų' },
	{ value: '85+', desc: 'mentorystės istorijos' },
	{ value: '1,3k+', desc: 'mitybos planų' },
];

export const ExperienceSection = () => {
	const { isMounted } = useIsMounted();
	const mediaQuery = useMediaQuery();

	return (
		<Container
			as="section"
			id="experience"
			maxWidth="var(--content-width)"
			className="padding--bt section--hidden"
		>
			<Cluster
				justify="space-between"
				className={`${styles.experienceItems} ${isMounted ? styles.onload : ''}`}
			>
				{experiences.map((item) => (
					<Cluster
						key={item.value}
						className={styles.exItem}
						gap="0.3rem"
						dir="column"
						align={mediaQuery < 577 ? 'center' : 'flex-start'}
					>
						<h3>{item.value}</h3>
						<h4>{item.desc}</h4>
					</Cluster>
				))}
			</Cluster>
		</Container>
	);
};
