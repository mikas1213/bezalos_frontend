import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Stack, SectionTitle, Container } from '../../components/Shared';
import PaslaugosTab from '../../components/paslaugos/PaslaugosTab';
import Naryste from '../../components/paslaugos/naryste/Naryste';
import Paslaugos from '../../components/paslaugos/paslaugos/Paslaugos';
import usePaslaugos from '../../hooks/paslaugos/usePaslaugos';
import NotFound from '../paymentPages/NotFound';
import { ReviewCard } from '../../components/Shared';
import { REVIEWS } from './Reviews';

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
        <Container>
            <Box padding={['2rem', '0', '4rem']}>
                <PaslaugosTab 
                    currentTab={currentTab} 
                    handleTabChange={handleTabChange} 
                />    

                {['naryste', 'paslaugos'].includes(currentTab) ? 
                    <Box padding={['1.5rem', '0']}>
                        <SectionTitle 
                            title='Keliaukime į pokyčius kartu!' 
                            size='md'
                        />
                    </Box> : <NotFound />}

                    {currentTab === 'naryste' && 
                    <Stack space='2rem'>
                        <Naryste /> 
                        <SectionTitle 
                            title='Klientų patirtys' 
                            subTitle='Išbaldžiusių Valgau be žalos | Virtuvę' 
                            size='md' 
                        />
                        <Grid>
                            {REVIEWS['naryste'].map(({ title, text }) => <ReviewCard key={title} title={title} text={text} />)}
                        </Grid>
                    </Stack>}
                {currentTab === 'paslaugos' && <Paslaugos paslaugos={paslaugos} isLoading={isLoading} /> }
            </Box>
        </Container>
    );
};

export default PaslaugosPage;