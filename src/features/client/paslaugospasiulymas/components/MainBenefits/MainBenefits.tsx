import styles from './MainBenefits.module.scss';
import { Box, Cluster } from '../../../../../components/Shared';
import { Check, Heart } from 'lucide-react';

interface BenefitsProps {
    benefits: string[]
}
export const MainBenefits = ({ benefits }: BenefitsProps) => {
    return (
        <Box className={styles.mainBenefits}>
            <Cluster className={styles.title} align='center' gap='var(--s-8)'>
                <Heart size={24} color='var(--light-green-500)' fill='var(--light-green-500)' />
                Ko pasieksi
            </Cluster>

            <Cluster gap='var(--s-16)' dir='column'>
                { benefits.map((benefit, index) => (
                    <Cluster key={index} gap='var(--s-12)' align='flex-start'>
                        <Cluster justify='center' align='center' className={styles.bulletPoint}>
                            <Check size={14} color='var(--white-100)' strokeWidth={3} />
                        </Cluster>
                        <Box className={styles.benefitText}>{benefit}</Box>
                    </Cluster>
                ))}
            </Cluster>
        </Box>
    );
};
