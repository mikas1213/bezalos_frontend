import { CircleCheck, CircleQuestionMark, type LucideIcon,Salad, Sprout  } from 'lucide-react';

import type { TargetProps } from '../Signup/types';

interface Targets {
    id: TargetProps;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const targets: Targets[] = [
        {
            id: "profilis",
            title: "Sveikas svorio metimas",
            description: "Ilgalaikiai svorio pokyčiai",
            icon: Salad
        },
        {
            id: "virtuve",
            title: "Išmokti sveikatai palankios mitybos pagrindų",
            description: "Išmoksi sveikos mitybos principų",
            icon: Sprout
        },
        {
            id: "abu",
            title: "Abu aukščiau pateikti variantai",
            description: "Ilgalaikiai mitybos įpročiai",
            icon: CircleCheck
        },
        {
            id: "nezinau",
            title: "Dar nežinau",
            description: "Noriu susipažinti su Be žalos",
            icon: CircleQuestionMark
        }
    ];
