import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import InformationSoon from '../components/information_soon/InformationSoon';

import { useEffect } from 'react';
// import axios from '../apis/axios';

const Virtuve = () => {
    
    useEffect(() => {
        document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Virtuvė';

        // const getData = async () => {
        //     await axios.get("/virtuve");
        // };
        // getData();
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

export default Virtuve;