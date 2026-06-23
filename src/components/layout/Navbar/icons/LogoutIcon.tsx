import type { IconProps } from './types';

// Arrow-out-of-portal glyph for the signed-in (Atsijungti) state.
export const LogoutIcon = ({ className }: IconProps) => (
	<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
		<path
			d="M10 12H20M20 12L17 9M20 12L17 15"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M4 12C4 7.58172 7.58172 4 12 4M12 20C9.47362 20 7.22075 18.8289 5.75463 17"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);
