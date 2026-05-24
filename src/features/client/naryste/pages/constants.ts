import type { ReviewProps } from '../../../../components/Shared/ReviewCard/RevievCard';
import type { Plan } from '../components/PlanCard';

export type ServiceSlug = 'mitybos-planas' | 'mitybos-planas-prieziura' | 'individualus-valgymo-terapeutas' | 'naryste';

const SHARED_BENEFITS = [
	{
		label: 'Mitybos rekomendacijos',
		tooltip: 'Kiekvieną savaitę gausi naują rekomendacinį mitybos racioną',
		included: true,
	},
	{
		label: 'Video mokymai ir dirbtuvės',
		tooltip: 'Video mokymai ir praktinės dirbtuvės lengvesniam santykiui su maistu kurti',
		included: true,
	},
	{
		label: 'Merginų bendruomenė',
		tooltip: 'Palaikanti "messenger" moterų bendruomenė',
		included: true,
	},
	{
		label: 'Online ir gyvi susitikimai',
		tooltip: 'Reguliarūs online ir gyvi susitikimai palaikymui, motyvacijai ir klausimų atsakymams',
		included: true,
	},
	{ label: 'Rezultatų sekimas', tooltip: 'Aiškus rezultatų sekimas, kad matytum savo progresą', included: true },
	{ label: 'Produktų keitimas', tooltip: 'Keisk produktus pagal poreikį ir viskas automatiškai persiskaičiuos', included: true },
	{
		label: 'Receptų kūrimas',
		tooltip: 'Kurk receptus iš savo mėgstamų valgių ir derink juos pagal savo mitybos planą',
		included: true,
	},
];

const PROFILIS_EXCLUDED = new Set([
	'Mitybos rekomendacijos',
	'Video mokymai ir dirbtuvės',
	'Merginų bendruomenė',
	'Online ir gyvi susitikimai',
]);

export const PLANS: Plan[] = [
	{
		id: 'profilis',
		icon: 'hands',
		title: 'Profilis',
		description: 'Pirmieji žingsniai į sveikesnį santykį su maistu tavo tempu.',
		price: { month: '€6,90', year: '€5,83' },
		priceChip: { month: '', year: 'Sutaupai 16%' },
		priceNote: { month: 'Atsisakyti gali bet kada', year: '€69,90 mokant už metus' },
		benefits: SHARED_BENEFITS.map((b) => ({ ...b, included: !PROFILIS_EXCLUDED.has(b.label) })),
		cta: 'Pradėti dabar',
		showIn: { month: true, year: true },
	},
	{
		id: 'virtuve_plus',
		icon: 'leaf',
		title: 'Virtuvė +',
		description: 'Pirmi 3 mėnesiai TIK ||€9,90!||',
		price: { month: '€9,90', year: '€9,90' },
		priceChip: { month: 'Sutaupyk €21,00', year: 'Sutaupyk €21,00' },
		priceNote: {
			month: 'Už 3 mėn. dabar mokėsi €29,70 — vėliau €16,90/mėn.',
			year: 'Už 3 mėn. dabar mokėsi €29,70 — vėliau €16,90/mėn.',
		},
		offerNote: 'Pasiūlymas galioja tik ||naujiems nariams||',
		benefits: SHARED_BENEFITS,
		cta: 'Pradėti dabar',
		featured: true,
		badge: 'Populiariausias',
		showIn: { month: true, year: false },
	},
	{
		id: 'virtuve',
		icon: 'sprout',
		title: 'Virtuvė',
		description: 'Palaikymas ilgalaikiams mitybos pokyčiams ir emociniam valgymui.',
		price: { month: '€16,90', year: '€8,33' },
		priceChip: { month: '', year: 'Sutaupai 51%' },
		priceNote: { month: 'Atsisakyti gali bet kada', year: '€99,90 mokant už metus' },
		benefits: SHARED_BENEFITS,
		cta: 'Pradėti dabar',
		showIn: { month: true, year: true },
	},
];

export const REVIEWS: Record<ServiceSlug, ReviewProps[]> = {
	'mitybos-planas': [
		{
			title: 'Svorio pokyčiai',
			text: 'Labuka. Gerai sekasi. -3,1 kg, vakarais nesinori papildomai greitųjų kokių angliavandenių. Aš patenkinta, žiurim kaip toliau organizmui patiks. Ačiū tau 🫶',
		},
		{
			title: 'Vidinė ramybė',
			text: 'Labai džiaugiuosi, kad per tą laiką nebuvo nei vieno persivalgymo, tai man čia toks didelis žingsnis į priekį. Bendrai tai tikrai jaučiuosi daug geriau nei anksčiau, nes jaučiuosi saugiau savo pasirinkimuose.',
		},
		{
			title: 'Valgau daugiau, sveriu mažiau',
			text: 'Sveika, atsiprašau, kad trukdau! Bet šiandien pasisveriau ir svoris valgant 2200 kcal vel pajudėjo, -2,3 kg! Labai esu dekinga Tau už planą!',
		},
	],
	'mitybos-planas-prieziura': [
		{
			title: 'Pokyčiai galvoje',
			text: 'Visada maniau, kad problema tik maistas, bet tavo dėka supratau, kaip stipriai siejasi mityba ir mano emocinė būsena. Tavo dėka išmokau tai pažinti ir persivalgymų neliko!',
		},
		{
			title: 'Online susitikimai',
			text: 'Kai apsisprendžiau išbandyti šį pasiūlymą maniau, kad nieko nebus. Bet tie 4 teminiai susimitimai man padėjo per praktikas viską susidėti galvoje, pasidėti mitybos pagrindus ir pažinti savo valgymo elgesį.',
		},
		{
			title: 'Maisto baimė',
			text: 'Sveika, mūsų darbas buvo kiek kitoks. Dabar labai aiškiai suprantu, kad aš bijojau maisto! Ačiū tau už tą saugią erdvę save pažinti ir rasti sau tinkamiausią būdą keliauti į pokyčius!',
		},
	],
	'individualus-valgymo-terapeutas': [
		{
			title: 'Nebereikia Wolt/Bolt',
			text: 'Kai atėjau pas tave, maistas į namus važiavo kasdien, bet mentorystės dėka supratau kas vyksta, kokias vidines problemas turiu ir kaip su jomis be maisto "dealinti". Ačiū tau už tai ko kiti tiek metų man neparodė!',
		},
		{
			title: 'Vienišumo jausmas',
			text: 'Sveika, kai pradėjom darbą kartu net nebūčiau patikėjus, kad visas mano emocinis valgymas susijęs su vienišumu. Ačiū, kad tai man parodei ir davei praktikių įrankių kaip su visu tuo tvarkytis 🌱',
		},
		{
			title: 'Nesuprantau kas vyksta',
			text: 'Man maistas visada buvo geriausias draugas ir tada kai pykau, ir tada kai džiaugiausi. Bet tu man padėjai suprasti kas vyksta iš tiesų, ko aš noriu, ko man reikia. Su tavim be maisto aš išmokau tai atliepti. AČIŪ!',
		},
	],
	naryste: [
		{
			title: 'Keityklė',
			text: 'As šiandien užsimaniau obuolinių blynų iš receptų, pagal planą -saldus sumuštinis, tai tiesiog keityklės pagalba, bananą keičiu į obuolį, sumuštinių duoną į miltus ir viskas ok iš sumustinių gaunasi blynai',
		},
		{
			title: 'Bendruomenė',
			text: 'Esu išbandžius labai daug panašių projektų, bet ten labai dažnai tave tarkuoja už kąsnį į šoną. Buvo tik atėjus baimės ir čia Bet tai ką tu ir 🤭 merginos čia sukūrėt yra kažkas nuostabaus! Ačiū 💚',
		},
		{
			title: 'Valgymo psichologija',
			text: 'Ši bendruomenė man labai patinka dėl to, kad joje kalbama ne tik apie maistą, bet ir apie tai KODĖL aš persivalgau. Įrašų dėka pavyko suprasti emocinį valgymą, nors pradžioj maniau, kad jo net neturiu.',
		},
	],
};
