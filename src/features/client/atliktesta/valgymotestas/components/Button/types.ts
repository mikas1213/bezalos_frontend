export type ButtonVariant = 'Atgal' | 'Toliau' | 'Baigti'
export interface ButtonProps {
    onClick: () => void;
    variant: ButtonVariant;
    disabled: boolean;
}
