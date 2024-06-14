import { useState, useEffect } from 'react';
import { PaymentProvider } from '../context/PaymentProvider';

import Main from '../components/UI/Main';
import Navbar from '../components/navbar/Navbar';
import Container from '../components/UI/Container';
import PaslaugosContainer from '../components/paslaugos/PaslaugosContainer';
import PaslaugosTab from '../components/paslaugos/PaslaugosTab';
import PaslaugosHeader from '../components/paslaugos/PaslaugosHeader';
import Naryste from '../components/paslaugos/naryste/Naryste';

const PaslaugosPage = () => {

    const [side, setSide] = useState('naryste');
    useEffect(() => {
        document.title = 'Be žalos | Paslaugos';
    }, []);

    // const handleServiceCheckout = async (product) => {
    //     try {
    //         const res = await axiosPrivate.post('/payments/service-checkout-session', product);
    //         console.log(res)
    //         // window.location = res.data.session.url;
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    return (
        <>
            <Navbar />
            <Main>
                <Container>
                    <PaslaugosContainer>    
                        <PaslaugosTab side={side} setSide={setSide} />    
                        <PaslaugosHeader paragraph={side === 'naryste' ? 'Rinktis narystės planą' : 'Rinktis paslaugą'}/> 
                        <PaymentProvider>
                            {side === 'naryste' && <Naryste /> }
                            {side === 'paslaugos' && <div>Paslaugos</div> }
                        </PaymentProvider>
                    </PaslaugosContainer>
                </Container>
            </Main>
        </>
        
    );
};

export default PaslaugosPage;