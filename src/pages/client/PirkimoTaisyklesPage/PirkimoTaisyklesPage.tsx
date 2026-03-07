import { Accordion, Box, Container } from '../../../components/Shared';
import { type AccordionData } from '../../../components/Shared/accordion/types';

import styles from './PirkimoTaisyklesPage.module.css';

const data: AccordionData = {
	properties: {
		colors: {
			bgColor: 'var(--light-green-grey-100)',
			textColor: 'var(--dark-green-500)',
			activeColor: 'var(--light-green-600)',
		},
		bulletPoint: '•',
		subBulletPoint: '-',
	},
	rows: [
		{
			title: 'Bendrosios nuostatos',
			items: [
				{
					text: 'Sandra Jatulytė dirbanti pagal individualios veiklos pažymą Nr. 1027302 (toliau –  “Pardavėjas”), teikiamų paslaugų naudojimosi sąlygos ir taisyklės (toliau – „Taisyklės“) pirkėjams (toliau – „Pirkėjas“), naudojimosi tvarka, saugumo reikalavimai, pareigos, pirkėjų įsipareigojimai.',
				},
				{
					text: 'Šios Taisyklės yra laikomos sutartimi, kuri yra sudaroma tarp Pirkėjo ir Pardavėjo. Pirkimo sutartis įsigalioja nuo įsigijimo momento t.y. sėkmingai atlikto mokėjimo. Su šia sutartimi Pirkėjas įgyja teisę naudotis bezalos.lt teikiamomis paslaugomis, tokiomis kaip narystė bei konkrečios paslaugos įsigijimas.',
				},
				{
					text: 'Pateikdamas užsakymą Pirkėjas sutinka kad jo pateikti asmens duomenys būtų tvarkomi užsakymų kontrolės, veiklos analizės ir tiesioginės rinkodaros tikslais. Pirkėjas taip pat sutinka, kad Pirkėjo nurodytu el. pašto adresu būtų siunčiami informaciniai pranešimai, būtini prekių užsakymui įvykdyti.',
				},
				{
					text: 'Pardavėjas pasilieka teisę bet kuriuo metu pakeisti, taisyti ar papildyti Taisykles, atsižvelgdamas į teisės aktų nustatytus reikalavimus.',
				},
			],
		},
		{
			title: 'Įstatymų laikymasis',
			items: [
				{
					text: 'Pardavėjas nėra atsakingas už trečiųjų šalių bezalos.lt pateikiamą informaciją diskusijose, mokymuose ar video įrašuose.',
				},
				{
					text: 'Pirkėjas naudodamasis Paslaugomis, sutinka nenaudoti Paslaugų jokiam tikslui, kuris yra neteisėtas ar draudžiamas šiose Taisyklėse, ir, kad laikysis šių Taisyklių ir visų galiojančių LR įstatymų. Paslaugų turinys yra informacinio pobūdžio ir gali būti naudojamas tik asmeniniais, laisvalaikio ir informaciniais tikslais.',
				},
			],
		},
		{
			title: 'Vartotojo įsipareigojimai',
			items: [
				{
					text: 'Pirkėjo įsigytos paslaugos negali būti perleidžiamos (dovanojamos, parduodamos, keičiamos ir pan.) kitiems asmenims. Pirkėjui perdavus prisijungimo duomenis ar kitaip leidus naudotis bezalos.lt paslaugomis tretiesiems asmenims, pirkėjas gali būti patrauktas baudžiamojon atsakomybėn pagal Lietuvos Respublikoje galiojančius įstatymus.',
				},
				{
					text: 'Draudžiama naudoti bezalos.lt turinį bet kokiu būdu, kuris pažeidžia bezalos.lt ir kitų naudotojų įskaitant autorių teises ir bet kokias kitas intelektinės nuosavybės teises.',
				},
			],
		},
		{
			title: 'Atsakomybės ribojimas',
			items: [
				{
					text: 'Pardavėjas yra atsakingas už fizinės ir/ar psichologinės sveikatos sutrikdymą pagal Lietuvos respublikos įstatymais numatytą tvarką.',
				},
				{
					text: 'Pardavėjas nėra atsakingas už trečiųjų šalių bezalos.lt pateikiamą informaciją diskusijose, mokymuose ar video įrašuose.',
				},
			],
		},
		{
			title: 'Narystė sąlygos',
			items: [
				{
					text: 'Norint užsakyti narystę būtina susikurti bezalos.lt vartotojo paskyrą ir būti prisijungusiam. Susikuriant bezalos.lt vartotojo paskyrą, būtina nurodyti naudojamą savo elektroninį pašto adresą.',
				},
				{
					text: 'Narystė įsigalioja automatiškai nuo apmokėjimo momento ir galioja pagal narystės tipą 30 kalendorinių dienų arba vienerius metus.',
				},
				{
					text: 'Prenumeratos suma nuskaitoma automatiškai kas mėnesį / metus (pagal narystės tipą) tol, kol Pirkėjas nenutraukia prenumeratos savo paskyroje.',
				},
				{
					text: 'Galiojant narystei vartotojas gali pasikeisti narystės tipą ir sumokėti arba susigrąžinti pinigų skirtumą.',
				},
				{
					text: 'Pakartotiniams pirkimams vykdyti bezalos.lt išsaugo paskutinius 4 bankinės kortelės skaitmenis, galiojimo datą, vartotojo vardą pavardę ir šalį.',
				},
				{
					text: 'Bezalos.lt turinio prenumerata užsakoma ne trumpesniam kaip vieno mėnesio laikotarpiui.',
				},
				{
					text: 'Užsakymo metu bezalos.lt narystės prenumeratos kaina nustatoma pagal tuo metu galiojančius bezalos.lt turinio prenumeratos įkainius. Bezalos.lt pasilieka teisę vienašališkai nustatyti naująją kainą naujam prenumeratos periodui.',
				},
				{
					text: 'Jei mokėjimas buvo nuskaitytas ir norite nutraukti narystę, dėl grąžinimo galite kreiptis per 24 val. nuo mokėjimo nuskaitymo momento. Visais kitais atvejais pinigai nėra grąžinami.',
				},
			],
		},
		{
			title: 'Paslaugų įsigijimas',
			items: [
				{
					text: 'Įsigijus paslaugą Pirkėjas informuoja Pardavėją elektroininiu paštu sandra@bezalos.lt arba socialiniame tinkle messenger.',
				},
				{
					text: 'Mitybos planas sudaromas per 3-5 d.d. nuo visos informacijos pateikimo (mitybos dienoraštis, anketa, maisto sekimo užduotis).',
				},
				{
					text: 'Įsigijus mitybos planą su priežiūra, aktyvios priežiūros laikas skaičiuojamas nuo sekančios dienos, kai Pirkėjas gauna mitybos planą ir galioja 30 kalendorinių dienų.',
				},
				{
					text: 'Pirkėjui pateikus su sveikata ar nelaime susijusias priežastis, pagrindžiančius dokumentus kodėl negalėjo naudotis priežiūros laiku, priežiūra gali būti pratęsta, tiek laiko kiek Pirkėjas negalėjo naudotis paslauga arba ne daugiau kaip 14 kalendorinių dienų.',
				},
				{
					text: 'Pardavėjas įsipareigoja priežiūros metu bendrauti ne rečiau kaip kartą per savaitę, o visas likęs bendravimas vyksta Pirkėjo iniciatyva.',
				},
			],
		},
		{
			title: 'Narystės nutraukimas ir pinigų grąžinimas',
			items: [
				{
					text: 'Pirkėjas bet kada gali atsisakyti bezalos.lt prenumeratos nuėjęs į paslaugų skiltį ir ten paspaudęs paslaugos valgymo mygtuką “ATSISAKYTI PRENUMERATOS”.',
				},
				{
					text: 'Nutraukus automatinį prenumeratos pratęsimą bezalos.lt narystei Pirkėjas naryste galės naudotis tol, kol baigsis einamasis mėnesis už kurį yra sumokėta.',
				},
				{
					text: 'Pinigai už sumokėtus mėnesius nėra grąžinami. Taip pat pinigai nėra grąžinami, jeigu Pirkėjas nesinaudojo ar mažai naudojosi bezalos.lt narystės paslaugomis, Pirkėjui Turinys nepatiko, pasirodė nepakankamai kokybiškas, buvo nepasiekiamas dėl Pirkėjo interneto tiekėjo arba galinio įrenginio kaltės ar pinigų grąžinimo prašymas buvo pateiktas dėl kitų subjektyvių priežasčių.',
				},
			],
		},
		{
			title: 'Paslaugų nutraukimas ir pinigų grąžinimas',
			items: [
				{
					text: 'Jei paslaugos nutraukimą inicijavo Pardavėjas, tuomet visa už paslaugą sumokėta suma grąžinama Pirkėjui.',
				},
				{
					text: 'Jei užsakymas jau buvo pradėtas vykdyti ir Pirkėjas nusprendžia atsisakyti paslaugos visa suma už suteiktas paslaugas nebus grąžinama:',
					subItems: [
						{
							text: 'Jei Pirkėjas užpildo tik anketą bezalos.lt Pirkėjui grąžinama 90% nuo sumokėtos sumos;',
						},
						{
							text: 'Jei pradedamos vykdyti paruošiamosios užduotys (maisto dienoraštis, mitybos sekimo užduotis) Pirkėjui grąžinama 75% sumokėtos sumos;',
						},
						{
							text: 'Jei paslauga pilnai suteikta, tačiau jis persigalvoja, grąžinama 50% sumokėtos sumos;',
						},
						{
							text: 'Jei Pirkėjas daugiau kaip 30 kalendorinių dienų nuo apmokėjimo nepradeda vykdyti savo įsipareigojimų (pildyti pateiktą informaciją) paslaugos vykdymas nutraukiamas ir pinigai negrąžinami.',
						},
					],
				},
			],
		},
		{
			title: 'Baigiamosios nuostatos',
			items: [
				{ text: 'Šios Taisyklės sudarytos vadovaujantis LR teisės aktais.' },
				{ text: 'Šių taisyklių pagrindu kylantiems santykiams taikoma LR teisė.' },
				{
					text: 'Pirkėjas ir Pardavėjas susitaria, kad visi su Sutartimi susiję ar dėl jos vykdymo, pažeidimo, nutraukimo ar negaliojimo kilę ginčai, pretenzijos ir (ar) nesutarimai sprendžiami derybų keliu. Jeigu susitarimo nepavyksta pasiekti derybomis, ginčai yra sprendžiami Lietuvos Respublikos teisės aktų nustatyta tvarka, kaip nurodyta Elektroninės parduotuvės naudojimo tvarkoje.',
				},
				{
					text: 'Tuo atveju, jei Pirkėjas nesutinka su Pardavėjo parengtu atsakymu į Pirkėjo rašytinę pretenziją, savo prašymą/skundą dėl www.bezalos.lt įsigytos prekės Pirkėjas gali pateikti Valstybinei vartotojų teisių apsaugos tarnybai (Vilniaus g. 25, 01402 Vilnius, el.p. tarnyba@vvtat.lt, tel. 8 5 262 67 51, faks. (8 5) 279 1466, interneto svetainėje www.vvtat.lt (taip pat Valstybinės vartotojų teisių apsaugos tarnybos teritoriniams padaliniams apskrityse) – ar užpildyti prašymo formą EGS platformoje https://ec.europa.eu/odr/.',
				},
			],
		},
		{
			title: 'Kontaktai',
			items: [
				{ text: 'Sandra Jatulytė' },
				{ text: 'sandra@bezalos.lt' },
				{ text: '+370 6 921 9312' },
			],
		},
	],
};

const PirkimoTaisyklesPage = () => {
	return (
		<Container maxWidth="var(--content-width)" className="padding--b">
			<Box className={styles.header}>
				<h1>Pirkimo pardavimo taisyklės</h1>
			</Box>
			<Accordion data={data} />
		</Container>
	);
};

export default PirkimoTaisyklesPage;
