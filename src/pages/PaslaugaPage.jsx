import Navbar from '../components/navbar/Navbar';
import Main from '../components/UI/Main';
import Container from '../components/UI/Container';
import Paslauga from '../components/paslaugos/paslaugos/Paslauga';
import Footer from '../components/UI/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const paslaugos = [
    {id: 1, title: 'Dėmesingo dėmesio kursai', grid_desc: '6 Online susitikimai', desc: '6 online susitikimai. Dėmesingo valgymo praktikos. Bendruomenė.', slug: 'demesingo-demesio-kursai', price: 99, discount: 0, popular: false},
    {id: 2, title: 'Mitybos planas', grid_desc: 'DOVANA: vieno mėn. nemokama narytė Virtuvėje', desc: 'Individualus mitybos planas. Produktų keitimo ir receptų sudarymo funkcijos (1 mėn. NEMOKAMAI). 1 mėnesio narystė Valgau be žalos | VIRTUVĖJE', slug: 'mitybos-planas', price: 35, discount: 0, popular: true},
    {id: 3, title: 'Mitybos planas + 4', grid_desc: 'Individualus mitybos planas', desc: 'Individualus mitybos planas. Produktų keitimo ir receptų sudarymo funkcijos priežiūros laikotarpiui su galimybe prasitęsti. Praktinės dirbtuvės prisijaukinti mitybos planui', slug: 'mitybos-planas-4', price: 189, discount: 33, popular: false},
    {id: 4, title: 'Valgymo terapeutas', grid_desc: '4 savaitės. Individualūs online susitikimai', desc: '4 savaitės. Individualūs online susitikimai. Palaikymas ir konsultavimas visas 4 savaites neribotai.', slug: 'valgymo-terapeutas', price: 229, discount: 0, popular: false}
];

const PaslaugaPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const paslauga = paslaugos.find(p => p.slug === slug);

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <Paslauga paslauga={paslauga} />   
                    <Footer />
                </Container>
            </Main>
        </>
    );
};

export default PaslaugaPage;