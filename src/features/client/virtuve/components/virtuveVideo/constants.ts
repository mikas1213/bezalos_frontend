interface Text {
	title: string;
	desc: string;
}

interface AccessType {
	course: Text;
	subscription: Text;
	login: Text;
	noOne: Text;
}

interface ActionType {
	like: AccessType;
	comment: AccessType;
}

export const ACCESS_MESSAGES: ActionType = {
	like: {
		course: {
			title: 'Pamėgti galite tik įsigijus kursą',
			desc: 'Įsigykite kursą "Emocinis valgymas" ir matykitę visą kurso turinį.',
		},
		subscription: {
			title: 'Pamėgti gali tik bendruomenės nariai',
			desc: 'Tapkite Virtuvės bendruomenės nariu ir matykite visą video turinį.',
		},
		login: {
			title: '',
			desc: '',
		},
		noOne: {
			title: '',
			desc: '',
		},
	},
	comment: {
		course: {
			title: 'Komentuoti galite tik įsigijus kursą',
			desc: 'Įsigykite kursą "Emocinis valgymas" ir galėsite komentuoti.',
		},
		subscription: {
			title: 'Komentuoti gali tik Virtuvės nariai',
			desc: 'Tapkite Virtuvės bendruomenės nariu ir galėsite komentuoti bei atsakyti.',
		},
		login: {
			title: 'Norėdami komentuoti, prisijunkite...',
			desc: '',
		},
		noOne: {
			title: '',
			desc: '',
		},
	},
};
