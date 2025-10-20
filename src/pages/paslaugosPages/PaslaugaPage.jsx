import { useParams } from 'react-router-dom';
import Main from '../../components/UI/Main';
import Container from '../../components/UI/Container';
import Paslauga from '../../components/paslaugos/paslauga/Paslauga';
import usePaslauga from '../../hooks/paslaugos/usePaslauga';

const PaslaugaPage = () => {
    const { slug } = useParams();
    const { paslauga, setPaslauga, isLoading } = usePaslauga(slug);
    return (
        <>
            <Main>
                <Container>
                    {isLoading ? <div style={{height: '100vh'}}></div> : <Paslauga paslauga={paslauga} setPaslauga={setPaslauga} />}
                </Container>
            </Main>
        </>
    );
};

export default PaslaugaPage;