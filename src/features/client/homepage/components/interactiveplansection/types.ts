import { type ReactNode } from 'react';
export type Card = {
    id: number, 
    icon: ReactNode,
    title: string,
    desc: string,
    photo: string,
    disabled: boolean
};

export type BottomItem = {
    title: string, 
    label: string
};

export type PhoneProps = {
    allCards: Card[],
    selected: number
};