import styles from './Phone.module.css';
import frame from '../../../../../../assets/videos/homepage/iphone17ProMaxFrame.png';
import { type PhoneProps } from '../types';

export const Phone = ({ allCards, selected }: PhoneProps) => {
	return (
		<div className={styles.videoPlayer}>
			<div className={styles.videoWrapper}>
				<video
					key={selected}
					autoPlay
					muted
					loop
					playsInline
					className={styles.video}
				>
					<source src={allCards[selected].photo} type='video/mp4' />
				</video>
			</div>
			<img src={frame} alt='iphne-frame' className={styles.frame} />
		</div>
	);
};
