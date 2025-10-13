import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import PaslaugosContainer from '../../components/paslaugos/PaslaugosContainer';
import PaslaugosTab from '../../components/paslaugos/PaslaugosTab';
import PaslaugosHeader from '../../components/paslaugos/PaslaugosHeader';
import Naryste from '../../components/paslaugos/naryste/Naryste';
import Paslaugos from '../../components/paslaugos/paslaugos/Paslaugos';
import Footer from '../../components/UI/Footer';
import usePaslaugos from '../../hooks/paslaugos/usePaslaugos';
import NotFound from '../paymentPages/NotFound';

const PaslaugosPage = () => {
    
    const { data:paslaugos, isLoading } = usePaslaugos();

    useEffect(() => {
        document.title = 'Be žalos | Paslaugos';
        document.body.style.backgroundColor = '#fff';
    }, []);

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentTab = searchParams.get('tab') || 'naryste';

    const handleTabChange = (tab) => {
        navigate(`?tab=${tab}`);
    };

    return (
        <>
            <Main>
                <Container>
                    <PaslaugosContainer>    
                        <PaslaugosTab 
                            currentTab={currentTab} 
                            handleTabChange={handleTabChange} 
                        />    
                        {['naryste', 'paslaugos'].includes(currentTab) ? <PaslaugosHeader currentTab={currentTab} /> : <NotFound />}
                        {currentTab === 'naryste' && <Naryste /> }
                        {currentTab === 'paslaugos' && <Paslaugos paslaugos={paslaugos} isLoading={isLoading} /> }
                        <Footer />
                    </PaslaugosContainer>
                </Container>
            </Main>
        </>
    );
};

export default PaslaugosPage;