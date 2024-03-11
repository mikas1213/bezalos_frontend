import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';

import { useEffect } from 'react';

const Receptai = () => {

    useEffect(() => {
        // document.body.style.backgroundColor = '#eff1ef';
        document.title = 'Be žalos | Receptai';
    }, []);

    return (
        <>
            <Navbar />
            <Main>
                <div>
                    <h1>Receptai</h1>
                </div>
            </Main>
        </>
    );
};

export default Receptai;