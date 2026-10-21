export interface ProfilisNavLink {
	to: string;
	label: string;
	/** `true` – aktyvus tik tiksliai šiame kelyje. */
	end?: boolean;
}

/** Profilio skiltys subnav'e. Naujas profilio puslapis pridedamas čia ir `App.tsx` maršrutuose. */
export const PROFILIS_NAV_LINKS: ProfilisNavLink[] = [
	{ to: '/profilis', label: 'Mitybos planas', end: true },
	{ to: '/profilis/produktu-keitimas', label: 'Produktų keitimas' },
	{ to: '/profilis/mano-receptai', label: 'Mano receptai' },
	{ to: '/profilis/kalorijos', label: 'Kalorijos' },
	{ to: '/profilis/statistika', label: 'Statistika' },
	{ to: '/profilis/anketa', label: 'Anketa' },
	{ to: '/profilis/nustatymai', label: 'Nustatymai' },
];
