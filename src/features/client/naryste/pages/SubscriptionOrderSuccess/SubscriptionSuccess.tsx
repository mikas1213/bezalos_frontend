import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ArrowLeftRight, BookOpen, CalendarCheck, ChefHat, CircleCheck, MessageCircleHeart, TrendingUp, Video } from 'lucide-react';

import { axiosPrivate } from '../../../../../api/axios';
import { Container } from '../../../../../components/Shared';

import styles from './SubscriptionSuccess.module.scss';

const FEATURES_VIRTUVE = [
	{ icon: CalendarCheck, label: 'Savaitinis mitybos planas' },
	{ icon: Video, label: 'Video mokymai ir dirbtuvės' },
	{ icon: MessageCircleHeart, label: 'Merginų bendruomenė' },
	{ icon: BookOpen, label: 'Online ir gyvi susitikimai' },
] as const;

const FEATURES_PROFILIS = [
	{ icon: TrendingUp, label: 'Rezultatų sekimas' },
	{ icon: ArrowLeftRight, label: 'Produktų keitimas' },
	{ icon: ChefHat, label: 'Receptų kūrimas' },
] as const;

const QUOTE = {
	text: 'Esu išbandžius labai daug panašių projektų, bet ten labai dažnai tave tarkuoja už kąsnį į šoną. Tai ką tu ir merginos čia sukūrėt yra kažkas nuostabaus!',
	author: 'Bendruomenės narė',
};

export const SubscriptionSuccess = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const plan = searchParams.get('plan');

	useEffect(() => {
		const getData = async () => {
			try {
				await axiosPrivate.post(`/payments/payment-success`);

				// Meta Pixel tracking for subscription purchase
				if (typeof window.fbq === 'function') {
					window.fbq('track', 'Subscribe', {
						currency: 'EUR',
						content_type: 'subscription',
						content_category: plan || 'general',
					});
				}
			} catch {
				navigate('/mokejimo-klaida');
			}
		};
		getData();
	}, [navigate, plan]);

	return (
		<div className={styles.page}>
			<div className={styles.ambientTop} />
			<div className={styles.ambientBottom} />

			<Container>
				<div className={styles.wrap}>
					<div className={styles.inner}>
						<div className={styles.top}>
							<div className={styles.iconWrap}>
								<CircleCheck size={42} color="#5CD45C" strokeWidth={1.6} />
							</div>
							<span className={styles.badge}>Narystė aktyvuota</span>
							<h1 className={styles.title}>Sveikiname!</h1>
							<p className={styles.subtitle}>Narystę gali valdyti narystės puslapyje.</p>
							<p className={styles.emailNote}>Patvirtinimo el. laiškas išsiųstas jūsų adresu.</p>
						</div>

						<div className={styles.divider} />

						{/* ── Features ── */}
						<div className={styles.featuresBlock}>
							<p className={styles.sectionLabel}>Tavo prieiga prie</p>
							<div className={styles.featuresGrid}>
								{(plan === 'profilis' ? FEATURES_PROFILIS : FEATURES_VIRTUVE).map(({ icon: Icon, label }) => (
									<div key={label} className={styles.featureTile}>
										<span className={styles.featureIcon}>
											<Icon size={20} color="#0E3D2E" strokeWidth={1.8} />
										</span>
										<span className={styles.featureLabel}>{label}</span>
									</div>
								))}
							</div>
						</div>

						<div className={styles.divider} />

						{/* ── Quote ── */}
						<blockquote className={styles.quote}>
							<p className={styles.quoteText}>„{QUOTE.text}“</p>
							<footer className={styles.quoteAuthor}>- {QUOTE.author}</footer>
						</blockquote>

						<div className={styles.divider} />

						{/* ── Actions ── */}
						<div className={styles.actions}>
							{(plan === 'virtuve' || plan === 'virtuve_plus') && (
								<button type="button" className={styles.ctaBtn} onClick={() => navigate('/virtuve')}>
									Į Virtuvę
								</button>
							)}
							{plan === 'profilis' && (
								<button type="button" className={styles.ctaBtn} onClick={() => navigate('/profilis')}>
									Į Profilį
								</button>
							)}
							<button type="button" className={styles.secondaryBtn} onClick={() => navigate('/naryste')}>
								Narystės puslapis
							</button>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
