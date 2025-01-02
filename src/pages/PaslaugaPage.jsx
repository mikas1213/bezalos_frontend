import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import Paslauga from '../components/paslaugos/paslaugos/Paslauga';
import Footer from '../components/UI/Footer';
import { useParams } from 'react-router-dom';
import usePaslauga from '../hooks/paslaugos/usePaslauga';

const PaslaugaPage = () => {
    const { slug } = useParams();
    const { paslauga, setPaslauga, isLoading } = usePaslauga(slug);

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    {!isLoading && <Paslauga paslauga={paslauga} setPaslauga={setPaslauga} />}
                    <Footer />
                </Container>
            </Main>
        </>
    );
};

export default PaslaugaPage;