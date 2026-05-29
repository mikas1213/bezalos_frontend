import type { AnswerItem, QuestionCategory, QuestionItem, ResultItem } from './types';

export const questions: QuestionItem[] = [
	{ id: 1, text: 'Suirzus užsinori valgyti', category: 'E' },
	{ id: 2, text: 'Jei skanu, valgai daugiau nei įprastai', category: 'I' },
	{ id: 3, text: 'Užsinori valgyti, jei nėra ką veikti', category: 'E' },
	{ id: 4, text: 'Priaugus svorio valgai mažiau', category: 'A' },
	{ id: 5, text: 'Užsinori valgyti, kai jautiesi prislėgta', category: 'E' },
	{ id: 6, text: 'Valgai daugiau nei įprastai, kai maistas yra geras', category: 'I' },
	{ id: 7, text: 'Atsisakai maisto ir gėrimų, nes jaudiniesi dėl savo kūno svorio', category: 'A' },
	{ id: 8, text: 'Valgai, kai jautiesi vieniša', category: 'E' },
	{ id: 9, text: 'Užsinori valgyti, kai labai skanu', category: 'I' },
	{ id: 10, text: 'Užsinori valgyti, kai tave kažkas nuvilia', category: 'E' },
	{ id: 11, text: 'Valgai mažesnėmis porcijomis', category: 'A' },
	{ id: 12, text: 'Suvalgai iškart, jei labai skanu', category: 'I' },
	{ id: 13, text: 'Užsinori valgyti, kai pyksti', category: 'E' },
	{ id: 14, text: 'Atkreipi dėmesį į tai, ką valgai', category: 'A' },
	{ id: 15, text: 'Užsinori suvalgyti ką nors skanaus', category: 'I' },
	{ id: 16, text: 'Užsinori valgyti, jei jautiesi nesmagiai', category: 'E' },
	{ id: 17, text: 'Valgai liekninančius maisto produktus', category: 'A' },
	{ id: 18, text: 'Užsinori valgyti, jei kažkas šalia valgo', category: 'I' },
	{ id: 19, text: 'Jei suvalgai per daug, kitą dieną porcijas sumažini', category: 'A' },
	{ id: 20, text: 'Užsinori valgyti, jei jauti nerimą', category: 'E' },
	{ id: 21, text: 'Sunku atsisakyti skanaus maisto', category: 'I' },
	{ id: 22, text: 'Sąmoningai valgai mažiau', category: 'A' },
	{ id: 23, text: 'Užsinori valgyti, jei kažkas vyksta ne pagal planą', category: 'E' },
	{ id: 24, text: 'Užsinori nusipirkti maisto, jei apima liūdesys', category: 'E' },
	{ id: 25, text: 'Valgai daugiau nei įprastai, kai valgo aplinkiniai', category: 'I' },
	{ id: 26, text: 'Nevalgai, nes kontroliuojai savo svorį', category: 'A' },
	{ id: 27, text: 'Užsinori valgyti, kai išsigąsti', category: 'E' },
	{ id: 28, text: 'Stengiesi nevalgyti vakare, nes kontroliuoji kūno svorį', category: 'A' },
	{ id: 29, text: 'Užsinori valgyti, kai nuobodu', category: 'E' },
	{ id: 30, text: 'Valgai atsižvelgdamas į kūno svorį', category: 'A' },
	{ id: 31, text: 'Užsinori valgyti, kai esi nusivylęs', category: 'E' },
	{ id: 32, text: 'Valgai gamindamas', category: 'I' },
];

export const answerItems: AnswerItem[] = [
	{ value: 1, label: 'Visiškai nesutinku' },
	{ value: 2, label: 'Nesutinku' },
	{ value: 3, label: 'Nei sutinku, nei nesutinku' },
	{ value: 4, label: 'Sutinku' },
	{ value: 5, label: 'Visiškai sutinku' },
];

export const resultItems: Record<QuestionCategory, ResultItem> = {
	E: { title: 'Emocinis valgymas', description: 'Valgymas reaguojant į patiriamas emocijas' },
	I: { title: 'Išorinis valgymas', description: 'Valgymas dėl to, kad maistas lengvai pasiekiamas' },
	A: { title: 'Ribojantis valgymas', description: 'Sąmoningas maisto kiekio kontroliavimas' },
};
