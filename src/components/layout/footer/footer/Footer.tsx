import styles from './Footer.module.css';
import { FooterSmall } from '../footersmall/FooterSmall';
import { Container, Cluster } from '../../../Shared';
import { NewsLetter } from '../newsletter/NewsLetter';
import { useMediaQuery } from '../../../../contexts/MediaQueryProvider';

export const Footer = () => {
    const mediaQuery = useMediaQuery();

    return (
        <Container as='footer' maxWidth='100vw' padding='0' className={`${styles.footer} padding--bt`}>
            <Container>
                <Cluster justify='center' align='center' dir={mediaQuery < 577 ? 'column' : 'row'} className={styles.footerTitle}>
                    <span>Keliaujam į ilgalaikius&nbsp;</span> 
                    <span>pokyčius kartu?</span>
                </Cluster>
                <Cluster justify='center' align='center' dir={mediaQuery < 577 ? 'column' : 'row'} className={styles.footerText}>
                    <p>Gauk palaikymą ir mokslu grįstą informaciją, kaip pagaliau pasiekti ilgalaikių rezultatų su meile ir be žalos</p>
                </Cluster>
                <NewsLetter />
                <FooterSmall />
            </Container>
        </Container>
    );
};