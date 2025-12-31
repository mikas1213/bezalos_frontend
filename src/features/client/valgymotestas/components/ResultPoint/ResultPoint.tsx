import styles from './ResultPoint.module.css';
import { Cluster } from '../../../../../components/Shared';

interface ResultPointProps {
    title: string;
    description: string;
    score: number;
};
export const ResultPoint = ({ title, description, score }: ResultPointProps) => {
    const resultPointClasses = [
        styles.resultPoint,
        score >= 2.5 && styles.actual
    ].filter(Boolean).join(' ');

    return (
        <Cluster dir='column' align='space-between' className={resultPointClasses}>
            <Cluster justify='space-between'>
                <h3 className={styles.title}>{ title }</h3>
                <span className={styles.score}>{ score?.toFixed(2) }</span>
            </Cluster>
            <p className={styles.description}>{ description }</p>
        </Cluster>
    );
};
