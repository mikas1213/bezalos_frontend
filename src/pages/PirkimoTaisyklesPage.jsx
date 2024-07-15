import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import Navbar from '../components/navbar/Navbar';
import PirkimoTaisyklesHeader from '../components/pirkimo_taisykles/PirkimoTaisyklesHeader';
import Accordion from '../components/pirkimo_taisykles/Accordion';
import PirkimoTaisyklesFooter from '../components/pirkimo_taisykles/PirkimoTaisyklesFooter';
const PirkimoTaisyklesPage = () => {
    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <PirkimoTaisyklesHeader />
                    <Accordion />
                    <PirkimoTaisyklesFooter />
                </Container>
            </Main>
        </>
    );
};

export default PirkimoTaisyklesPage;