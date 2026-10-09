import kuskis from '../../assets/images/pasimatom-netrukus.webp';
import { Container } from '../Shared';

import styles from './InformationSoon.module.css';

const InformationSoon = () => {
	return (
		<Container className='padding--b'>
			<div className={styles.informationSoonContainer}>
				<img src={kuskis} alt='cat image' />
				<span>Informacija ruošiama</span>
				<span>pasimatome jau netrukus</span>
			</div>
		</Container>
	);
};

export default InformationSoon;
