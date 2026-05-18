import { IoIosCloseCircleOutline } from 'react-icons/io';

import { type OverlayProps } from './types';

import styles from './Overlay.module.css';

const Overlay = ({ children, handleSentOffer }: OverlayProps) => {
	return (
		<div className={styles.overLay}>
			<div className={styles.offerModal}>
				<IoIosCloseCircleOutline className={styles.icon} onClick={() => handleSentOffer()} />
				{children}
			</div>
		</div>
	);
};

export default Overlay;
