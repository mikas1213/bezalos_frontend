import { type ReactNode } from 'react';
export type Card = {
    id: number, 
    icon: ReactNode,
    title: string,
    desc: string,
    disabled: boolean
};