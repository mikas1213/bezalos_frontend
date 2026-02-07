import type { ReactNode } from 'react';
export type Pages = 'home' | 'recipes' | 'default';
type IsChangeColor = { isScroll: boolean; page: Pages };

export type NavbarProps = {
	page: Pages;
};
export type ItemsProps = {
	children: ReactNode;
	isOpenBurger: boolean;
};

export type LogoProps = {
	isChangeColor: IsChangeColor;
};

export type IconProps = {
    active?: boolean,
    stroke?: number
};

export type NavHeight =
	| 'var(--nav-height-80)'
	| 'var(--nav-height-70)'
	| 'var(--nav-height-60)';

export type HamburgerProps = NavbarProps & {
    isScroll: boolean,
    isOpenBurger: boolean;
    setIsOpenBurger: (value: boolean | ((prev: boolean) => boolean)) => void,
};

export interface NavbarState {
	user_id: string | null;
	user_role: number | null;
	isScroll: boolean;
	currentPage: string;
	isOpenBurger: boolean;
	setIsOpenBurger: (value: boolean | ((prev: boolean) => boolean)) => void;
	responsiveNavHeight: NavHeight;
}