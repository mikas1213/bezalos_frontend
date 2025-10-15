import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { HeroSection } from '../../../features/client/homepage/components';
import { Offer } from '../../../components/layout';
type CookieValue = { COOKIE_OFFER: string  };

const HomePage = () => {
    const [isShowOffer, setIsShowOffer] = useState<boolean>(false);
    const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies<'COOKIE_OFFER', CookieValue>(['COOKIE_OFFER']);

    useEffect(() => {
        setTimeout(() => {
            setIsShowOffer(true);
        }, 2000);
        return () => setIsShowOffer(false);
    }, []);

    return (
        <>
            {(!cookies.COOKIE_OFFER && isShowOffer || isOfferSent) && <Offer setIsShowOffer={setIsShowOffer} setIsOfferSent={setIsOfferSent} isOfferSent={isOfferSent} setCookie={setCookie} />}
            <HeroSection />
            <div>Pirmas</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>

            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
            <div>yra</div>
        </>
    );
};

export default HomePage;