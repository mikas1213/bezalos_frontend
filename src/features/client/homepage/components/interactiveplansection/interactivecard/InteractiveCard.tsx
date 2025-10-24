import styles from './InteractiveCard.module.css';
import type { Dispatch, SetStateAction } from 'react';
import { type Card } from '../types';
type CardProps = {
    card: Card,
    selected?: boolean,
    setSelected?: Dispatch<SetStateAction<number>>
};

export const InteractiveCard = ({ card, selected, setSelected }: CardProps) => {
    const catdClasses = [
        styles.interactiveCard,
        selected && styles.selected,
        card.disabled && styles.disabled
    ].filter(Boolean).join(' ');

    const handleOnClick = () => {
        if(setSelected) {
            setSelected(card.id);
        }
    };

    return (
        <div className={catdClasses} onClick={handleOnClick}>
            <div className={styles.icon}>{card.icon}</div>
            <div className={styles.title}>{card.title}</div>
            <div className={styles.desc}>{card.desc}</div>
        </div>
    );
};