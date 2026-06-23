import type { IconProps } from './types';

// Shield glyph flagging the admin-only entry point.
export const ShieldIcon = ({ className }: IconProps) => (
	<svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
		<path
			d="M8 1.5 13 3.2v4.3c0 3.2-2.1 5.6-5 6.9-2.9-1.3-5-3.7-5-6.9V3.2L8 1.5Z"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			strokeLinejoin="round"
		/>
		<path
			d="M5.8 7.9 7.3 9.4 10.2 6"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.4"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
