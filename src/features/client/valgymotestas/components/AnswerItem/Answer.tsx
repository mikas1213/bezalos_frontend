import styles from './Answer.module.css';
import { Cluster } from '../../../../../components/Shared';
import { Check } from 'lucide-react';
import type { AnswerValue } from '../../../../../pages/client/ValgymoTestasPage/types';
import type { AnswerItem } from '../../../../../pages/client/ValgymoTestasPage/types';
import type { CSSProperties } from 'react';
interface AnswerItemProps {
    onClick: () => void;
    index: number;
    currentAnswer: AnswerValue;
    option: AnswerItem;
}

export const Answer = ({ onClick, index, currentAnswer, option }: AnswerItemProps) => {
    const answerClasses = [
        styles.answer,
        currentAnswer === option.value && styles.active
    ].filter(Boolean).join(' ');

    return (
        <button
            onClick={onClick}
            className={answerClasses}
            style={{'--answer-animation': `${index * 0.1}s`} as CSSProperties}
        >
            <Cluster align='center' gap='var(--s-16)'>
                <Cluster justify='center' align='center' className={styles.bulletPoint}>
                    <Check color='var(--white-100)' size={14} />
                </Cluster>
                <span className={styles.answerTitle}>{option.label}</span>
            </Cluster>
        </button>
    );
};
