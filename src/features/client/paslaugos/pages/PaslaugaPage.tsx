import { useParams } from 'react-router-dom';

import { Box, Container, Grid, Stack } from '../../../../components/Shared';
import { ReviewCard } from '../../../../components/Shared/ReviewCard/RevievCard';
import { SectionTitle } from '../../../../components/Shared/SectionTitle/SectionTitle';
import usePaslauga from '../../../client/paslaugos/hooks/usePaslauga';
import { Paslauga } from '../components/Paslauga';

import { REVIEWS } from './Reviews';
import { type ServiceSlug } from './Reviews';
const PaslaugaPage = () => {
	const { slug } = useParams();
	const { paslauga, setPaslauga, isLoading } = usePaslauga(slug);

	return (
		<Container>
			{isLoading ? (
				<div style={{ height: '100vh' }}></div>
			) : (
				<>
					{paslauga && <Paslauga paslauga={paslauga} setPaslauga={setPaslauga} />}

					{REVIEWS[slug as ServiceSlug] && (
						<Stack space="3rem">
							<SectionTitle title="Klientų patirtys" subTitle="Išbandžius mitybos planą" />
							<Box padding={['0', '0', '5rem', '0']}>
								<Grid>
									{REVIEWS[slug as ServiceSlug].map(({ title, text }) => (
										<ReviewCard key={title} title={title} text={text} />
									))}
								</Grid>
							</Box>
						</Stack>
					)}
				</>
			)}
		</Container>
	);
};

export default PaslaugaPage;
