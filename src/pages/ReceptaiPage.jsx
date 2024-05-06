import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import InformationSoon from '../components/information_soon/InformationSoon';
import { useEffect } from 'react';

const ReceptaiPage = () => {

    useEffect(() => {
        // document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Receptai';
    }, []);

    return (
        <>
            <Navbar />
            <Main>
                <InformationSoon />
            </Main>
        </>
    );
};

export default ReceptaiPage;