import type { ReviewProps } from '../../../../components/Shared/ReviewCard/RevievCard';
export type ServiceSlug = 'mitybos-planas' | 'mitybos-planas-prieziura' | 'individualus-valgymo-terapeutas' | 'naryste';

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
			text: 'Kai atėjau pas tave, maistas į namus važiavo kasdien, bet mentorystės dėka supratau kas vyksta, kokias vidines problemas turiu ir kaip su jomis be maisto “dealinti”. Ačiū tau už tai ko kiti tiek metų man neparodė!',
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
