import { Lock, X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import bannerImg from '../../../assets/images/offer/banner.webp';

import styles from './Banner.module.scss';

interface BannerProps {
	visible: boolean;
	onClose: () => void;
}

function CloseBtn({ onClick }: { onClick: () => void }) {
	return (
		<button type="button" onClick={onClick} aria-label="Užverti" className={styles.closeBtn}>
			<X size={20} strokeWidth={1.8} />
		</button>
	);
}

function renderTitle(title: string) {
	return title.split('||').map((part, i) =>
		i % 2 === 1 ? (
			<em key={i} className={styles.titleAccent}>
				{part}
			</em>
		) : (
			<span key={i}>{part}</span>
		),
	);
}

export function Banner({ visible, onClose }: BannerProps) {
	const navigate = useNavigate();
	const [, setCookie] = useCookies(['COOKIE_OFFER']);

	function handleCta() {
		setCookie('COOKIE_OFFER', true, { path: '/' });
		navigate('/virtuve');
	}

	if (!visible) return null;

	return createPortal(
		<div className={styles.backdrop}>
			<div className={`${styles.modal} ${styles['palette-cream']} ${styles.layoutSide}`}>
				<CloseBtn onClick={onClose} />

				<div className={`${styles.photo} ${styles.photoSide}`}>
					<img src={bannerImg} alt="" className={styles.photoImg} style={{ objectPosition: 'center center' }} />
					<div className={`${styles.photoFade} ${styles.photoFadeSide}`} />
				</div>

				<div className={styles.content}>
					<div className={styles.eyebrow}>— IŠBANDYK NEMOKAMAI</div>

					<h2 className={styles.title}>{renderTitle('Virtuvės video įrašų ištraukos ||nemokamai||')}</h2>

					<p className={styles.body}>Pokalbiai apie emocinį valgymą, santykį su maistu ir vidinį nuovargį.</p>

					<div className={styles.ctaArea}>
						<button type="button" className={styles.ctaBtn} onClick={handleCta}>
							ŽIŪRĖTI DABAR
						</button>
						<div className={styles.trustNote}>
							<Lock size={16} />
							<span>Jokių įsipareigojimų</span>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	);
}
