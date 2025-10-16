import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useIsMounted } from '../../../hooks';
import { HeroSection, ExperienceSection } from '../../../features/client/homepage/components';
import { Offer } from '../../../components/layout';
type CookieValue = { COOKIE_OFFER: string };

const HomePage = () => {

    const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies<'COOKIE_OFFER', CookieValue>(['COOKIE_OFFER']);
    const { isMounted, setIsMounted } = useIsMounted({ delay: 3000 });

    return (
        <>
            {(!cookies.COOKIE_OFFER && isMounted || isOfferSent) && <Offer setIsMounted={setIsMounted} setIsOfferSent={setIsOfferSent} isOfferSent={isOfferSent} setCookie={setCookie} />}
            <HeroSection />
            <ExperienceSection />
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
        </>
    );
};

export default HomePage;