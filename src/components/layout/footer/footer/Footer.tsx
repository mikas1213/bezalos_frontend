import { useMediaQuery } from '../../../../contexts/MediaQueryProvider';
import { Cluster, Container } from '../../../Shared';
import { FooterSmall } from '../footersmall/FooterSmall';
import { NewsLetter } from '../newsletter/NewsLetter';

import styles from './Footer.module.css';

export const Footer = () => {
	const mediaQuery = useMediaQuery();

	return (
		<Container
			as="footer"
			maxWidth="100vw"
			padding="0"
			className={`${styles.footer} padding--bt`}
		>
			<Container>
				<Cluster
					justify="center"
					align="center"
					dir={mediaQuery < 577 ? 'column' : 'row'}
					className={styles.footerTitle}
				>
					<span>Keliaujam į ilgalaikius&nbsp;</span>
					<span>pokyčius kartu?</span>
				</Cluster>
				<Cluster
					justify="center"
					align="center"
					dir={mediaQuery < 577 ? 'column' : 'row'}
					className={styles.footerText}
				>
					<p>
						Gauk palaikymą ir mokslu grįstą informaciją, kaip pagaliau pasiekti
						ilgalaikių rezultatų su meile ir be žalos
					</p>
				</Cluster>
				<NewsLetter />
				<FooterSmall />
			</Container>
		</Container>
	);
};
