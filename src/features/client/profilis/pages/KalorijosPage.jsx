import { useState } from 'react';

import KalorijosHeader from '../../../../components/profilis/kalorijos/KalorijosHeader';
import Results from '../../../../components/profilis/kalorijos/Results';
import Container from '../../../../components/UI/Container';
import { ProfilisHeader } from '../components/ProfilisHeader';
import { PROFILIS_HEADERS } from '../constants/ProfilisHeaders';

const KalorijosPage = () => {
    const [calculations, setCalculations] = useState({
        gender: 'Moteris',
        weight: '',
        height: '',
        age: '',
        activity: 0,
        ratio: 1
    });

    return (
        <Container>
            <ProfilisHeader {...PROFILIS_HEADERS.kalorijos} />
            <KalorijosHeader calculations={calculations} setCalculations={setCalculations} />
            <Results calculations={calculations} />
        </Container>
    );
};

export default KalorijosPage;