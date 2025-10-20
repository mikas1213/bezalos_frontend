import styles from './OfferCard.module.css';
import { Kitchen, MealPlan, Mentorship } from '../icons';
import { Box, Cluster, Stack } from '../../../../../../components/Shared';
import type { OfferCardProps, IconsMap } from '../types';
const iconsMap: IconsMap = {
    kitchen: <Kitchen />,
    mealplan: <MealPlan />,
    mentorship: <Mentorship />
};

export const OfferCard = ({ card, index }: { card: OfferCardProps, index: number }) => {
    const offerCardClasses = [
        styles.offerCard, 
        card.id === 'kitchen' ? styles.darkTheme : styles.lightTheme
    ].join(' ');

    
    return (
        <Box padding={['var(--s-32)']} className={offerCardClasses}>
            <Stack splitAfter={6} space='var(--s-20)'>
                <Box>{iconsMap[card.id]}</Box>
                <Box className={styles.title}>{card.title}</Box>
                <Box className={styles.paragraph}>{card.body}</Box>
                <Box className={styles.subTitle}>{card.subTitle}</Box>
                <Cluster gap='var(--s-16)' className={styles.paragraph}>
                    <Box>•</Box>
                    <Box>{card.p1}</Box>
                </Cluster>
                <Cluster gap='var(--s-16)' className={styles.paragraph}>
                    <Box>•</Box>
                    <Box>{card.p2}</Box>
                </Cluster>
                <Box className={styles.btn}>
                    <button>{card.btnLabel}</button>
                </Box>
            </Stack>          
        </Box>
    );
};