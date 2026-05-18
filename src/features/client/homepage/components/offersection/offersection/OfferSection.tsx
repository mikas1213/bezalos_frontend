import { Container, Grid, Stack } from '../../../../../../components/Shared';
import { SectionTitle } from '../../../../../../components/Shared/SectionTitle/SectionTitle';
import { useResponsivePadding } from '../../../../../../hooks';
import { OfferCard } from '../offercard/OfferCard';
import { type OfferCardProps } from '../types';

import offersDataRaw from './offersData.json';
const offersData = offersDataRaw as OfferCardProps[];

export const OfferSection = () => {
	const responsivePading = useResponsivePadding();

	return (
		<Container as="section" id="offer" maxWidth="100vw" padding="0" className="section--hidden padding--b">
			<Container maxWidth="var(--content-width)">
				<Stack space="var(--s-56)">
					<SectionTitle
						title="Nežinai nuo ko pradėti?"
						subTitle="Žemiau rasi tris skirtingus būdus pradėti – pasirink tą, kuris šiuo metu tau atdoro artimiausias"
					/>
					<Grid space={responsivePading} min="256px">
						{offersData.map((card) => (
							<OfferCard key={card.id} card={card} />
						))}
					</Grid>
				</Stack>
			</Container>
		</Container>
	);
};
