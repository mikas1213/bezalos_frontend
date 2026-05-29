// import { useState } from 'react';
import { useCookies } from 'react-cookie';

// import { Offer } from '../../../components/layout';
import { Banner } from '../../../../components/layout';
import { ObserverProvider } from '../../../../contexts/ObserverProvider';
import { useIsMounted } from '../../../../hooks';
import {
	AboutSection,
	EducationSection,
	ExperienceSection,
	HeroSection,
	InteractivePlanSection,
	OfferSection,
	ReviewSection,
} from '../components';
type CookieValue = { COOKIE_OFFER: string };

const HomePage = () => {
	// const [isOfferSent, setIsOfferSent] = useState<boolean>(false);
	const [cookies, setCookie] = useCookies<'COOKIE_OFFER', CookieValue>(['COOKIE_OFFER']);
	const { isMounted, setIsMounted } = useIsMounted({ delay: 4000 });

	return (
		<ObserverProvider>
			{!cookies.COOKIE_OFFER && isMounted && (
				//  || isOfferSent
				// <Offer
				// 	setIsMounted={setIsMounted}
				// 	setIsOfferSent={setIsOfferSent}
				// 	isOfferSent={isOfferSent}
				// 	setCookie={setCookie}
				// />
				<Banner
					visible={true}
					onClose={() => {
						setIsMounted(false);
						setCookie('COOKIE_OFFER', true, { path: '/' });
					}}
				/>
			)}
			<HeroSection />
			<ExperienceSection />
			<AboutSection />
			<EducationSection />
			<OfferSection />
			<InteractivePlanSection />
			<ReviewSection />
		</ObserverProvider>
	);
};

export default HomePage;
