import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import PirkimoTaisyklesHeader from '../components/pirkimo_taisykles/PirkimoTaisyklesHeader';
import Accordion from '../components/pirkimo_taisykles/Accordion';
import PirkimoTaisyklesFooter from '../components/pirkimo_taisykles/PirkimoTaisyklesFooter';

const PirkimoTaisyklesPage = () => {
    return (
        <>
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