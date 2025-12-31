import styles from './ResultTable.module.css';
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { Box, Cluster } from '../../../../../components/Shared';

interface ResultPageProps {
    children: ReactNode;
}
export const ResultTable = ({ children }: ResultPageProps) => {
    return (
        <Cluster dir='column'>
            <Cluster justify='center' align='center' className={styles.resultHeaderIcon}>
                <Check size={40} color='var(--white-100)' strokeWidth={3} />
            </Cluster>
            <h1 className={styles.resultTitle}>Anketa užpildyta!</h1>
            <p className={styles.resultSubTitle}>Žemiau matai, tai ką atskleidė tavo valgymo įpročiai</p>

            <Box padding={['var(--s-40)']} borderRadius='16px' className={styles.resultsPoints}>
                <h2 className={styles.resultsPointsLabel}>Jūsų rezultatai</h2>
                <Cluster gap='var(--s-24)'>
                    { children }
                </Cluster>
            </Box>
        </Cluster>
    );
}
