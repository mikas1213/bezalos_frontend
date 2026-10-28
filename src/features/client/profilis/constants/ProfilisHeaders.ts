export interface ProfilisHeaderContent {
	title: string;
	subtitle?: string;
	/** „Kaip tai veikia“ vaizdo įrašo nuoroda. Be jos mygtukas nerodomas. */
	tutorialLink?: string;
}

/** Kiekvieno profilio puslapio antraštės tekstai (pagal dizainą). */
export const PROFILIS_HEADERS = {
	mitybosPlanas: {
		title: 'Tavo mitybos planas',
		tutorialLink: 'https://youtu.be/FaMiA17ZTWw',
	},
	produktuKeitimas: {
		title: 'Produktų keitimas',
		subtitle:
			'Įvesk produktą ir jo kiekį gramais — sistema parodys, kiek tos pačios kategorijos alternatyvų reikia, kad kalorijos liktų tos pačios.',
		tutorialLink: 'https://youtu.be/lWZj6OZBuoo',
	},
	manoReceptai: {
		title: 'Receptų sudarymas',
		subtitle: 'Susikurk savo receptus iš mėgstamų produktų — sistema suskaičiuos kalorijas ir makroelementus už tave.',
		tutorialLink: 'https://youtu.be/sJUk-HCbcZ8',
	},
	kalorijos: {
		title: 'Kalorijų skaičiuoklė',
		subtitle: 'Apskaičiuok savo dienos kalorijų ir maistinių medžiagų poreikį pagal lytį, amžių, ūgį, svorį ir aktyvumą.',
	},
	statistika: {
		title: 'Statistika',
		subtitle: 'Kartą per savaitę užsirašyk svorį ir apimtis – matysi, kaip keičiasi tavo kūnas, ne tik svarstyklių skaičius.',
	},
	anketa: {
		title: 'Anketa',
		subtitle:
			'Atsakyk į klausimus apie save, savo dieną ir mitybos įpročius – pagal juos sudarysime tau tinkantį mitybos planą.',
	},
	mitybosSekimas: {
		title: 'Mitybos sekimas',
		subtitle:
			'Susivesk, ką suvalgei – matysi dienos kalorijas ir makroelementus. Dažnai valgomus patiekalus išsisaugok ir pridėk vienu paspaudimu.',
	},
} satisfies Record<string, ProfilisHeaderContent>;
