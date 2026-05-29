import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { Box, Container } from '../../../../../components/Shared';
import { COOKIES, type CookieValues } from '../../../../../constants/cookies';
import { FeatureCard, HeroSection, MainBenefits, PriceCard, TagLine } from '../components';

import { services } from './constants';

import styles from './PaslaugosPasiulymasPage.module.scss';
type CookieValue = CookieValues[typeof COOKIES.TEST_RESULT.name];
import type { ServiceType } from './types';

const PaslaugosoPasiulymasPage = () => {
	const navigate = useNavigate();
	const [cookies] = useCookies([COOKIES.TEST_RESULT.name]);
	const result = cookies[COOKIES.TEST_RESULT.name] as ServiceType | undefined;
	const validResults: CookieValue[] = Object.values(COOKIES.TEST_RESULT.values);

	useEffect(() => {
		if (!result || !validResults.includes(result)) {
			navigate('/', { replace: true });
		} else if (result === (COOKIES.TEST_RESULT.values.good as ServiceType)) {
			navigate('/paslaugos-nereikia', { replace: true });
		}
	}, [result, validResults, navigate]);

	if (!result || !validResults.includes(result)) return null;
	if (result === (COOKIES.TEST_RESULT.values.good as ServiceType)) return null;

	const service = services[result];

	return (
		<Container maxWidth="100vw" padding="0">
			<HeroSection title={service.title} subTitle={service.subtitle} stats={service.stats} />

			<Container maxWidth="var(--content-width)">
				<Box padding={['80px', '0px']}>
					<div className={styles.mainContent}>
						<Container className={styles.leftSide} padding="0">
							<TagLine tagIcon={service.icon} tagLine={service.tagline} description={service.description} />
							<MainBenefits benefits={service.mainBenefits} />

							<div className={styles.featuresGrid}>
								{service.features.map((feature, index) => (
									<FeatureCard key={index} Icon={feature.icon} title={feature.title} description={feature.desc} />
								))}
							</div>
						</Container>

						<PriceCard
							PriceIcon={service.priceIcon}
							price={service.price}
							duration={service.duration}
							codeDesc={service.codeDesc}
							code={service.code}
							trustSignals={service.trustSignals}
							url={service.url}
						/>
					</div>
				</Box>
			</Container>
		</Container>
	);
};

export default PaslaugosoPasiulymasPage;
