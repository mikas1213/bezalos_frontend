import styles from './ReviewCard.module.css';
import { Stack } from '../../Shared';
import { useMediaQuery } from '../../../contexts/MediaQueryProvider';
import { FaStar } from 'react-icons/fa6';
export type ReviewProps = {
    title: string,
    text: string
}

export const ReviewCard = ({ title, text }: ReviewProps) => {
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
