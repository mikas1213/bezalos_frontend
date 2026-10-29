import Container from '../../../../components/UI/Container';
import { ProfilisHeader } from '../components/ProfilisHeader';
import { PROFILIS_HEADERS } from '../constants/ProfilisHeaders';
import { KalorijosCalculator } from '../kalorijos/components/KalorijosCalculator';

const KalorijosPage = () => (
	<Container>
		<ProfilisHeader {...PROFILIS_HEADERS.kalorijos} />
		<KalorijosCalculator />
	</Container>
);

export default KalorijosPage;
