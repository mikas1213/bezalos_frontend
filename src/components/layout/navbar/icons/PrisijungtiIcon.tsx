import { type IconProps } from '../types';
export const PrisijungtiIcon = ({ active = false, stroke = 1.5 }: IconProps) => {
    const color = active ? 'var(--light-green-600)' : 'var(--dark-green-600)';

    return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="15" cy="10.5" rx="1" ry="1.5" fill={color}/>
        <ellipse cx="9" cy="10.5" rx="1" ry="1.5" fill={color}/>
        <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke={color} strokeWidth={stroke} strokeLinecap="round"/>
    </svg>
    );
}
