import { type ReactNode } from 'react';

export type OfferCardProps = {
    id: 'kitchen' | 'mealplan' | 'mentorship',
    title: string[],
    body: string,
    subTitle: string,
    p1: string,
    p2: string,
    btnLabel: string, 
    url: string
}

export type IconsMap = Record<Pick<OfferCardProps, 'id'>['id'], ReactNode>;