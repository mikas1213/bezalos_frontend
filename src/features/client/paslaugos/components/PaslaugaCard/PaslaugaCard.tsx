import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PaslaugaDto } from '../../services/paslaugosService';

import styles from './PaslaugaCard.module.scss';
interface Paslauga {
	paslauga: PaslaugaDto;
}
export const PaslaugaCard = ({ paslauga }: Paslauga) => {
	const navigate = useNavigate();
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<div className={`${styles.card}`}>
			<div className={styles.imgContainer}>
				{paslauga.status !== '-' && paslauga.quantity > 3 && (
					<div className={styles[paslauga.status]}>{paslauga.status}</div>
				)}
				{paslauga.quantity <= 3 && <div className={styles.quantity}>{`Liko ${paslauga.quantity}vnt.`}</div>}
				{paslauga.quantity === 0 && <div className={styles.quantity}>Išparduota</div>}
				{parseFloat(paslauga.discount) > 0 && (
					<div className={styles.discount}>-{Math.round(parseFloat(paslauga.discount))}%</div>
				)}
				{!imageLoaded && <div className={styles.skeleton}></div>}

				<img
					src={paslauga.image_m}
					alt={paslauga.title}
					onLoad={() => setImageLoaded(true)}
					style={{ opacity: imageLoaded ? 1 : 0 }}
				/>
			</div>

			<div className={styles.cardBody}>
				<div className={styles.priceContainer}>
					<div className={styles.price}>€{paslauga.current_price}</div>
					{parseFloat(paslauga.discount) > 0 && <div className={styles.wasPrice}>€{paslauga.base_price}</div>}
				</div>

				<div className={styles.title}>{paslauga.title}</div>
				<div className={styles.desc}>{paslauga.grid_desc}</div>
			</div>
			<div className={styles.buttons}>
				<button
					type="button"
					onClick={() => {
						// Meta Pixel tracking for service interest
						if (typeof window.fbq === 'function') {
							window.fbq('track', 'ViewContent', {
								content_type: 'service',
								content_name: paslauga.title,
								content_category: paslauga.category || 'service',
								value: paslauga.current_price,
								currency: 'EUR',
							});
						}
						navigate(`/paslaugos/${paslauga.slug}`);
					}}
				>
					Rinktis
				</button>
			</div>
		</div>
	);
};
