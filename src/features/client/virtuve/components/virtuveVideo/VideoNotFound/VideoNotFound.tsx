import { useNavigate } from 'react-router-dom';

import { VideoOff } from 'lucide-react';

import { Box, Cluster } from '../../../../../../components/Shared';

import styles from './VideoNotFound.module.scss';

export const VideoNotFound = () => {
	const navigate = useNavigate();

	return (
		<Box padding={['5rem', '2rem']}>
			<Cluster justify="center" align="center" dir="column">
				<Cluster className={styles.iconWrap} align="center" justify="center">
					<VideoOff size={48} />
				</Cluster>
				<h2 className={styles.title}>Video nerastas</h2>
				<p className={styles.desc}>
					Šio video įrašo nepavyko rasti. Jis galėjo būti pašalintas arba nuoroda yra
					neteisinga.
				</p>
				<button type="button" className={styles.backBtn} onClick={() => navigate(-1)}>
					← Grįžti atgal
				</button>
			</Cluster>
		</Box>
	);
};
