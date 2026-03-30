import { Accordion, Box, Container } from '../../../components/Shared';
import type { AccordionData } from '../../../components/Shared/accordion/types';

import styles from './PrivatumoPolitikaPage.module.css';

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
			title: '1. Tiesiogiai jūsų pateikiama informacija',
			items: [
				{ text: 'el. paštas' },
				{ text: 'paskutinė apsilankymo data' },
				{ text: 'informacija, reikalinga tiesiogiai vykdyti www.bezalos.lt teikiamas paslaugas.' },
			],
		},
		{
			title: '2. Jūsų asmeninių duomenų naudojimas',
			items: [
				{
					text: 'Jūsų asmeninė informacija gali būti naudojama pasirinktų paslaugų užtikrinimui. Be aiškaus jūsų sutikimo mes neteikiame jūsų asmeninių duomenų jokioms trečiosioms šalims tiesioginės rinkodaros ar kitais tikslais.',
				},
			],
		},
		{
			title: '3. Politikos pakeitimai',
			items: [
				{
					text: 'Mes pasiliekame teisę atnaujinti šią privatumo politiką paskelbdami naują versiją savo interneto svetainėje. Kartkartėmis Jūs turėtumėte peržiūrėti šį puslapį, kad įsitikintumėte, jog esate patenkintas bet kokiais pasikeitimais.',
				},
			],
		},
		{
			title: '4. Slapukai',
			items: [
				{
					text: 'Šioje svetainėje naudojami saugumo slapukai. Šie slapukai yra būtini, norint naudotis www.bezalos.lt paslaugomis. Norint nesinaudoti šiais slapukais, prašome nesinaudoti www.bezalos.lt paslaugomis, kitu atveju, mes tai priimsime kaip sutikimą jais naudotis.',
				},
			],
		},
		{
			title: '5. Trečiųjų šalių interneto svetainės',
			items: [
				{
					text: 'Šioje interneto svetainėje yra nuorodų į kitas interneto svetaines. Mes nesame atsakingi už trečiųjų šalių interneto svetainių privatumo politikas ar praktikas.',
				},
			],
		},
	],
};

const PrivatumoPolitikaPage = () => {
	return (
		<Container className="padding--b">
			<Box className={styles.header}>
				<h1>Privatumo Politika</h1>
				<p>Kokią informacją apie jus renkame?</p>
			</Box>
			<Accordion data={data} />
		</Container>
	);
};
export default PrivatumoPolitikaPage;
