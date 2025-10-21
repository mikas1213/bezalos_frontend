import styles from './InformationSoon.module.css';
import { Container } from '../Shared';
import kuskis from '../../assets/images/pasimatom-netrukus.webp';

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
