import { useEffect } from 'react';

import { Box, Container } from '../../../../components/Shared';
import { SectionTitle } from '../../../../components/Shared/SectionTitle/SectionTitle';
import { PaslaugaCard } from '../components/PaslaugaCard';
import usePaslaugos from '../hooks/usePaslaugos';

import styles from './PaslaugosPage.module.scss';

const PaslaugosPage = () => {
	const { data: paslaugos, isLoading } = usePaslaugos();

	useEffect(() => {
		document.title = 'Be žalos | Paslaugos';
		document.body.style.backgroundColor = '#fff';
	}, []);

	return (
		<Container>
			<Box padding={['0rem', '0', '4rem']}>
				<Box padding={['2.5rem', '0']}>
					<SectionTitle title="Keliaukime į pokyčius kartu!" size="md" />
				</Box>

				{isLoading ? (
					<div className={styles.loadingContainer}></div>
				) : paslaugos ? (
					<div className={styles.paslaugos}>
						{paslaugos.map((paslauga) => (
							<PaslaugaCard key={paslauga.id} paslauga={paslauga} />
						))}
					</div>
				) : (
					<div className={styles.notFoundContainer}>Šiuo metu paslaugų nerasta</div>
				)}
			</Box>
		</Container>
	);
};

export default PaslaugosPage;
