import { Salad, Sprout, CircleCheck, CircleQuestionMark, type LucideIcon  } from 'lucide-react';
import type { InitialTarget } from '../../contexts/types';

interface Targets {
    id: InitialTarget;
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
