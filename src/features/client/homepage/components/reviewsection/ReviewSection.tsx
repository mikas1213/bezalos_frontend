import styles from './ReviewSection.module.css';
import { Container, Grid, Stack } from '../../../../../components/Shared';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import { FaStar } from 'react-icons/fa6';
type Reviews = {
    title: string,
    text: string
}
const reviews: Reviews[] = [
    {title: 'Narystė Virtuvėje', text: 'Kuriamas turinys labai patinka, video visi naudingi, visus perklausiau, ir po truputi stengiuosi įtvirtinti išgirstą informaciją savo rutinoje'},
    {title: 'Produktų keitimo funkcija', text: 'Keityklės dėka vietoj alyvuogių galiu legaliai valgyti šokoladą ir tai puikiai atitinka mano mitybos planą! Ačiū tau, pagaliau esu visiškai rami dėl savo maisto pasirinkimų'},
    {title: 'Svorio pokyčiai', text: 'Vien sekant tavo turinį per 5 mėnesius man pavyko atsikratyti 17 kilogramų! Ačiū tau už tokį naudingą ir praktiškai lengvai taikomą turinį 💚'}
];
const ReviewCard = ({title, text}: Reviews) => {
    const mediaQuery: number = useMediaQuery();

    return (
        <Stack className={styles.reviewCard} 
            space={mediaQuery < 577 ? 'clamp(0rem, 2.778vw, 1rem)' : 'clamp(0rem, 1.563vw, 1rem)'} 
            splitAfter={2}    
        >
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
            <div className={styles.stars}>
                {Array.from({length: 5}, (_, i) => <FaStar className={styles.icon} key={i}/>)}
            </div>
        </Stack>
    );
};

export const ReviewSection = () => {

    return (
        <Container as='section' id='reviews' maxWidth='var(--content-width)' className='section--hidden padding--b'>
            <Grid min='265px'>
                {reviews.map((item, i) => <ReviewCard title={item.title} text={item.text} key={i}/> )}
            </Grid>
        </Container>
    );
};
