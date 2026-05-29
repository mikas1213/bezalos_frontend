export type AnswerValue = 1 | 2 | 3 | 4 | 5;
export type QuestionCategory = 'E' | 'I' | 'A';
export type AnswerMap = Record<number, AnswerValue>;

type ResultTitle = 'Emocinis valgymas' | 'Išorinis valgymas' | 'Ribojantis valgymas';
type ResultDesc =
	| 'Valgymas reaguojant į patiriamas emocijas'
	| 'Valgymas dėl to, kad maistas lengvai pasiekiamas'
	| 'Sąmoningas maisto kiekio kontroliavimas';

export interface QuestionItem {
	id: number;
	text: string;
	category: QuestionCategory;
}

export interface AnswerItem {
	value: number;
	label: string;
}

export interface ResultItem {
	title: ResultTitle;
	description: ResultDesc;
}
