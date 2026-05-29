import { Calendar, Gift, Heart, Shield, TrendingUp, Users } from 'lucide-react';

import { COOKIES } from '../../../../../constants/cookies';

import type { Services } from './types';

export const services: Services = {
	[COOKIES.TEST_RESULT.values.emocinis]: {
		title: 'Emociniam valgymui įveikti',
		subtitle: 'Pažink emocijas, užuot jas malšinus maistu',
		stats: [
			{ value: '70%', label: 'Sumažėja emocinio valgymo epizodų' },
			{ value: '4 savaitės', label: 'Darbo kartu' },
			{ value: '1-1', label: 'Individualios konsultacijos kas savaitę' },
		],
		icon: '💚',
		tagline: 'Atrask ramybę su maistu',
		description:
			'Specialiai sukurta paslauga toms, kurios valgo reaguodamos į stresą, liūdesį ar nerimą. Išmoksi atpažinti emocijas ir valdyti jas sveikais būdais.',
		mainBenefits: [
			'Sumažinsi stresinio valgymo epizodus iki 70%',
			'Sukursi naujus įpročius per 4 savaites',
			'Individualus palaikymas kiekvieną dieną',
		],
		features: [
			{ icon: Heart, title: 'Emocijų valdymas', desc: 'Atpažinsi ir išmoksi tvarkytis su patiriamomis emocijomis' },
			{ icon: Users, title: 'Individualios sesijos', desc: '1x per savaitę su manimi' },
			{ icon: Shield, title: 'Asmeninė pagalba', desc: 'Individualios konsultacijos' },
			{ icon: TrendingUp, title: 'Pažangos stebėjimas', desc: 'Dienoraštis ir įrankiai' },
		],
		price: '€199.90',
		priceIcon: Calendar,
		duration: '4 savaičių intensyvi programa',
		codeDesc: '15% nuolaidos kodas specialiai tau:',
		code: 'DOVANA',
		trustSignals: ['Saugus mokėjimas', 'Susisiekite iškart po apmokėjimo', '24/7 asmeninis palaikymas'],
		url: '/paslaugos/mitybos-planas-prieziura',
	},

	[COOKIES.TEST_RESULT.values.isorinis]: {
		title: 'Valgymui iš įpročio įveikti',
		subtitle: 'Pažink savo valgymo įpročius',
		stats: [
			{ value: '75%', label: 'Mažiau užkandžiavimo' },
			{ value: '30+', label: 'Video įrašų archyvas' },
			{ value: '€16.90', label: 'Vertės dovana' },
		],
		icon: '💚',
		tagline: 'Atrask ramybę su maistu',
		description:
			'Skirta toms, kurios užkandžiauja matydamos skanų maistą ar dėl to, kad valgo kiti. Išmoksi klausytis tikrojo alkio ir sotumo signalų.',
		mainBenefits: ['Atpažinsi savo tikrąjį alkį', 'Sumažinsi užkandžiavimą 75%', 'Virtuvės narystė dovanų'],
		features: [
			{ icon: Heart, title: 'Dovana', desc: 'Narystė Virtuvėje' },
			{ icon: Users, title: 'Merginų bendruomenė', desc: 'Nuolatinė galimybė klausti' },
			{ icon: Shield, title: 'Porcijų kontrolė', desc: 'Mokymasis valdyti kiekius' },
			{ icon: TrendingUp, title: 'Receptai', desc: 'Sveikų patiekalų idėjos' },
		],
		price: '€49.90',
		priceIcon: Gift,
		duration: 'Virtuvės narystė dovanų',
		codeDesc: '15% nuolaidos kodas specialiai tau:',
		code: 'DOVANA',
		trustSignals: ['Saugus mokėjimas', 'Susisiekite iškart po apmokėjimo', '24/7 bendruomenės palaikymas'],
		url: '/paslaugos/mitybos-planas',
	},

	[COOKIES.TEST_RESULT.values.ribojantis]: {
		title: 'Ribojančiam valgymui įveikti',
		subtitle: 'Išsilaisvink nuo dietų kasdienybės',
		stats: [
			{ value: '65%', label: 'Sumažėjusių persivalgymo epizodų' },
			{ value: '4 savaitės', label: 'Darbo kartu' },
			{ value: '1-1', label: 'Individualios konsultacijos kas savaitę' },
		],
		icon: '💚',
		tagline: 'Atrask ramybę su maistu',
		description:
			'Toms, kurios nuolat kontroliuoja maistą ir jaudinasi dėl kūno svorio. Išmok maitintis laisvai ir intuityviai.',
		mainBenefits: [
			'Įveik dietinį mąstymą per 4 savaites',
			'Sumažinkite susirūpinimą dėl svorio 80%',
			'Mitybos ir valgymo psichologijos žinios',
		],
		features: [
			{ icon: Heart, title: 'Intuityvus valgymas', desc: 'Be griežtų taisyklių' },
			{ icon: Users, title: 'Komandinis darbas', desc: 'Mityba + psichologija' },
			{ icon: Shield, title: 'Kūno įvaizdis', desc: 'Teigiamo požiūrio formavimas' },
			{ icon: TrendingUp, title: 'Ilgalaikis pokytis', desc: 'Vidinė ramybė' },
		],
		price: '€269.90',
		priceIcon: Calendar,
		duration: '4 savaičių individuali programa',
		codeDesc: '15% nuolaidos kodas specialiai tau:',
		code: 'DOVANA',
		trustSignals: ['Saugus mokėjimas', 'Susisiek iškart po apmokėjimo', '24/7 asmeninis palaikymas'],
		url: '/paslaugos/individualus-valgymo-terapeutas',
	},

	[COOKIES.TEST_RESULT.values.main]: {
		title: 'Pažink savo mitybos įpročius',
		subtitle: 'Sužinok kodėl iki šiol nepasiekei rezultatų',
		stats: [
			{ value: '94%', label: 'Rekomenduoja' },
			{ value: '4 savaitės', label: 'Darbo kartu' },
			{ value: '1-1', label: 'Individualios konsultacijos kas savaitę' },
		],
		icon: '💚',
		tagline: 'Atrask ramybę su maistu',
		description:
			'Toms, kurios nuolat persivalgo ir užkandžiauja tiek dėl patiriamų emocijų, tiek dėl intensyvių dietų patirčių, tiek dėl to, kad maistas lengvai prieinamas. Išmok gyventi be įkyrių minčių apie mitybą ir maistą',
		mainBenefits: [
			'Pagerinsi santykį su maistu per 4 savaites',
			'Sumažinsi įkyrių minčių apie mitybą ir maistą 80%',
			'Pažinsi savo valgymo įpročius',
		],
		features: [
			{ icon: Heart, title: 'Individualus mitybos planas', desc: 'Be griežtų taisyklių' },
			{ icon: Users, title: 'Individualus darbas', desc: '4 teminės sesijos' },
			{ icon: Shield, title: 'Asmeninis dėmesys', desc: 'Sveiko santykio kūrimas' },
			{ icon: TrendingUp, title: 'Rezultatų siekimas', desc: 'Interaktyvūs įrankiai' },
		],
		price: '€199.90',
		priceIcon: Calendar,
		duration: '4 savaičių individualus kelias',
		codeDesc: '15% nuolaidos kodas specialiai tau:',
		code: 'DOVANA',
		trustSignals: ['Saugus mokėjimas', 'Susisiek iškart po apmokėjimo', '24/7 asmeninis palaikymas'],
		url: '/paslaugos/mitybos-planas-prieziura',
	},
};
