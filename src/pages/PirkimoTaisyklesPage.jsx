import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import Navbar from '../components/navbar/Navbar';
import Accordion from '../components/pirkimo_taisykles/Accordion';
import AccHeader from '../components/pirkimo_taisykles/AccHeader';

const PirkimoTaisyklesPage = () => {
    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <AccHeader />
                    <Accordion />
                </Container>
            </Main>
        </>
    );
};

export default PirkimoTaisyklesPage;