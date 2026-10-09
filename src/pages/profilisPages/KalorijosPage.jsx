import { useState } from 'react';

import KalorijosHeader from '../../components/profilis/kalorijos/KalorijosHeader';
import Results from '../../components/profilis/kalorijos/Results';
import Container from '../../components/UI/Container';

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
            <KalorijosHeader calculations={calculations} setCalculations={setCalculations} />
            <Results calculations={calculations} />
        </Container>
    );
};

export default KalorijosPage;