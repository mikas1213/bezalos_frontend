import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { useIsMounted } from '../../../hooks';
import { ObserverProvider } from '../../../contexts/ObserverProvider';
import { 
    HeroSection, 
    ExperienceSection, 
    AboutSection,
    EducationSection,
    OfferSection,
    ReviewSection
} from '../../../features/client/homepage/components';
import { Offer } from '../../../components/layout';
type CookieValue = { COOKIE_OFFER: string };

const HomePage = () => {

    const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
    const [cookies, setCookie] = useCookies<'COOKIE_OFFER', CookieValue>(['COOKIE_OFFER']);
    const { isMounted, setIsMounted } = useIsMounted({ delay: 3000 });

    return (
        <ObserverProvider>
            {(!cookies.COOKIE_OFFER && isMounted || isOfferSent) && <Offer setIsMounted={setIsMounted} setIsOfferSent={setIsOfferSent} isOfferSent={isOfferSent} setCookie={setCookie} />}
            <HeroSection />
            <ExperienceSection />
            <AboutSection />
            <EducationSection />
            <OfferSection />
            <ReviewSection />
        </ObserverProvider>
    );
};

export default HomePage;