/** A single block of article prose: paragraph, heading or pull-quote. */
export type ArticleBodyBlock = { t: 'p'; x: string } | { t: 'h'; x: string } | { t: 'q'; x: string };

export interface Article {
	id: string;
	slug: string;
	featured: boolean;
	cat: string;
	title: string;
	excerpt: string;
	img: string;
	author: string;
	date: string;
	readTime: string;
	body: ArticleBodyBlock[];
}

export const articleCategories = ['Visi', 'Mityba', 'Emocinis valgymas', 'Santykis su maistu', 'Įpročiai', 'Istorijos'] as const;

export const articles: Article[] = [
	{
		id: '26b89c03-8105-4a97-b9b0-9a8dfe7d29b1',
		slug: 'emocinis-valgymas',
		featured: true,
		cat: 'Emocinis valgymas',
		title: 'Kodėl valgome tada, kai iš tikrųjų nesame alkani',
		excerpt:
			'Emocinis valgymas dažnai prasideda ne nuo skrandžio, o nuo minčių ir jausmų. Pažvelkim, kaip atpažinti tikrąjį alkį ir švelniai grįžti prie savęs.',
		img: '/og-articles/article-eating.webp',
		author: 'Sandra Jatulytė',
		date: '2025 05 12',
		readTime: '7 min',
		body: [
			{
				t: 'p',
				x: 'Beveik kiekviena iš mūsų bent kartą atsidūrė prie atidaryto šaldytuvo vėlų vakarą — ne todėl, kad kūnas prašė maisto, o todėl, kad diena buvo per sunki, per tuščia arba tiesiog per daug. Tai nėra silpnumas ar valios stoka. Tai būdas, kuriuo mokomės nuraminti save.',
			},
			{ t: 'h', x: 'Kuo skiriasi fizinis ir emocinis alkis' },
			{
				t: 'p',
				x: 'Fizinis alkis ateina palaipsniui. Jį galima atidėti, jis tenkinasi įvairiu maistu, o pavalgius jaučiamės sotūs ir ramūs. Emocinis alkis dažniausiai užklumpa staiga, reikalauja konkretaus maisto „čia ir dabar“ ir lieka nepasotinamas — net ir po didelės porcijos jaučiame, kad to neužteko.',
			},
			{
				t: 'p',
				x: 'Esmė ne tame, kad emocinį valgymą reikia visiškai išnaikinti. Maistas gali būti paguoda, ir tai normalu. Problema kyla tada, kai jis tampa vieninteliu būdu susitvarkyti su jausmais.',
			},
			{
				t: 'q',
				x: 'Prieš klausdama „ką noriu suvalgyti?“, pabandyk paklausti savęs: „ko man iš tikrųjų dabar reikia?“',
			},
			{ t: 'h', x: 'Dažniausi emocinio valgymo trigeriai' },
			{
				t: 'p',
				x: 'Stresas, nuovargis, vienatvė, nuobodulys ir net džiaugsmas gali tapti signalu siekti maisto. Dažnai tai įvyksta automatiškai — net nespėjame pastebėti minties, kuri pakišo ranką prie spintelės.',
			},
			{
				t: 'p',
				x: 'Naudinga kelias dienas tiesiog pastebėti, kada ranka tiesiasi prie užkandžio be alkio. Be vertinimo, be kaltės — tik įsiklausant. Modeliai, kuriuos pamatysi, papasakos daugiau nei bet kuri dieta.',
			},
			{ t: 'h', x: 'Mažas stabtelėjimas vietoje kontrolės' },
			{
				t: 'p',
				x: 'Vietoje to, kad uždraustum sau, pabandyk įterpti vieną minutę tarp impulso ir veiksmo. Giliai įkvėpk, padėk ranką ant krūtinės ir tiesiog pasitikrink — ar tai alkis, ar nuovargis, vienatvė, įtampa? Kartais atsakymas vis tiek bus „noriu valgyti“, ir tai visiškai gerai. Bet kartais pamatysi, kad iš tiesų reikia poilsio, pokalbio ar tiesiog dešimties minučių sau.',
			},
			{
				t: 'p',
				x: 'Šis stabtelėjimas nėra kontrolės įrankis. Tai būdas grįžti į kontaktą su savimi — pasiteirauti, ko nori ne dėl įpročio, o iš tikrųjų.',
			},
			{ t: 'h', x: 'Ką daryti, kai noras vis tiek lieka' },
			{
				t: 'p',
				x: 'Jei stabtelėjus supranti, kad tai emocijos, pabandyk švelnų alternatyvų ritualą: šiltą arbatą, kelias gilias įkvėpimo minutes, žinutę artimam žmogui, trumpą pasivaikščiojimą ar net ašaras, jei jų reikia. Tikslas — ne nuslopinti jausmą, o jį pastebėti ir paguosti kitaip nei tik maistu.',
			},
			{
				t: 'p',
				x: 'O jei vis tiek nusprendi pavalgyti — padaryk tai sąmoningai ir be kaltės. Atsisėsk, mėgaukis, leisk sau pajusti skonį. Sąmoningas valgymas dažnai sotina greičiau nei skubotas, kaltės lydimas kąsnis.',
			},
			{ t: 'h', x: 'Kaip kalbėtis su savimi švelniau' },
			{
				t: 'p',
				x: 'Vidinis kritikas retai padeda keistis — dažniausiai jis tik didina įtampą, o įtampa vėl veda prie maisto. Pabandyk su savimi kalbėti taip, kaip kalbėtum su geriausia drauge: be teismo, su supratimu ir kantrybe.',
			},
			{ t: 'q', x: 'Tu nesi problema, kurią reikia sutvarkyti. Tu esi žmogus, kuriam reikia rūpesčio.' },
			{ t: 'h', x: 'Kada verta kreiptis pagalbos' },
			{
				t: 'p',
				x: 'Jei valgymas tapo pagrindiniu būdu susidoroti su sunkiais jausmais, jei jis lydimas didelės kaltės ar gėdos arba jaučiesi įstrigusi rate, iš kurio nepavyksta išeiti — tai puiki priežastis kreiptis pagalbos. Ne todėl, kad kažkas „negerai su tavimi“, o todėl, kad nusipelnei palaikymo.',
			},
			{
				t: 'p',
				x: 'Sąmoningas santykis su maistu kuriamas ne per griežtumą, o per smalsumą ir švelnumą sau. Kiekvienas toks stabtelėjimas — jau pokytis.',
			},
		],
	},
	{
		id: 'ebc2eb5b-73ac-44fd-baee-fc80a44dc46e',
		slug: 'pusryciai-baltymai',
		featured: false,
		cat: 'Mityba',
		title: 'Sotūs pusryčiai: kiek baltymų iš tiesų reikia ryte',
		excerpt:
			'Subalansuoti pusryčiai padeda išvengti popietinio alkio bangų. Štai paprasta formulė, kuri tinka beveik kiekvienai dienai.',
		img: '/og-articles/article-produce.webp',
		author: 'Sandra Jatulytė',
		date: '2025 04 28',
		readTime: '5 min',
		body: [
			{
				t: 'p',
				x: 'Jei popiet jautiesi išalkusi ir traukia prie saldumynų, atsakymas dažnai slypi ne valios stiprume, o tame, ką valgei ryte. Baltymingi pusryčiai padeda ilgiau išlaikyti sotumą ir stabilesnę energiją per visą dieną.',
			},
			{ t: 'h', x: 'Paprasta ryto formulė' },
			{
				t: 'p',
				x: 'Siek 20–30 g baltymų pusryčiams. Tai gali būti dvi kiaušinienės kiaušiniai su daržovėmis, varškės ar graikiško jogurto porcija su uogomis, arba augaliniai variantai — tofu, ankštinės, baltyminga košė su sėklomis.',
			},
			{
				t: 'p',
				x: 'Prie baltymų pridėk skaidulų (daržovių ar vaisių) ir šiek tiek sveikų riebalų — taip patiekalas taps soti ir subalansuota visuma, o ne greitai praeinantis cukraus pakilimas.',
			},
			{ t: 'q', x: 'Geri pusryčiai — tai ne taisyklė, kurią reikia ištverti, o investicija į ramesnę dieną.' },
			{
				t: 'p',
				x: 'Nereikia tobulumo. Net vienas baltymingesnis rytas per savaitę jau yra žingsnis link stabilesnės savijautos.',
			},
		],
	},
	{
		id: 'd257d3ee-53b6-42d3-acae-17c6d5cb98a2',
		slug: 'santykis-su-maistu',
		featured: false,
		cat: 'Santykis su maistu',
		title: 'Maistas nėra nei „geras", nei „blogas"',
		excerpt:
			'Kai maistą skirstome į leistiną ir draudžiamą, kuriame įtampą. Kalbamės apie tai, kaip atsisakyti kaltės ir valgyti ramiau.',
		img: '/og-articles/article-hands.webp',
		author: 'Sandra Jatulytė',
		date: '2025 04 15',
		readTime: '6 min',
		body: [
			{
				t: 'p',
				x: 'Kai maistą padalijame į „leistiną“ ir „uždraustą“, nejučia sukuriame įtampą. Draudžiamas produktas tampa dar viliojantis, o suvalgytas — užtraukia kaltės bangą. Taip prasideda ratas, kuris vargina ne kūną, o galvą.',
			},
			{ t: 'h', x: 'Kodėl moralinis vertinimas neveikia' },
			{
				t: 'p',
				x: 'Joks produktas savaime nepadaro tavęs „gera“ ar „bloga“. Tortas gimtadienyje, duona pusryčiams ar šokoladas vakare — tai tiesiog maistas tam tikrame kontekste. Kai atsisakome moralinio ženklinimo, sumažėja ir kaltė, ir kompulsyvus noras prisivalgyti „kol dar galima“.',
			},
			{ t: 'q', x: 'Maistas neturi moralės. Tu nesi nei geresnė, nei blogesnė dėl to, ką suvalgei.' },
			{
				t: 'p',
				x: 'Vietoje „ar man galima?“ pabandyk klausti „ar man dabar to norisi ir kaip jausiuosi po to?“. Šis perėjimas nuo taisyklių prie poreikių grąžina pasirinkimo laisvę ir ramybę.',
			},
			{
				t: 'p',
				x: 'Sveikas santykis su maistu — tai ne tobula mityba, o galimybė valgyti be nuolatinio teismo sau.',
			},
		],
	},
	{
		id: '367b8a0c-84b4-437e-8ce4-b70ca97a34b3',
		slug: 'iprociai-maziems-zingsniams',
		featured: false,
		cat: 'Įpročiai',
		title: 'Maži žingsniai, kurie iš tikrųjų išlieka',
		excerpt:
			'Ilgalaikiai pokyčiai gimsta ne iš griežtų taisyklių, o iš mažų, pasikartojančių sprendimų. Kaip kurti įpročius be prievartos sau.',
		img: '/og-articles/article-believe.webp',
		author: 'Sandra Jatulytė',
		date: '2025 03 30',
		readTime: '8 min',
		body: [
			{
				t: 'p',
				x: 'Naujus įpročius dažnai pradedame su dideliu užmoju: nuo pirmadienio viskas keisis. Bet kuo griežtesnis planas, tuo greičiau jis subyra — ne dėl tinginystės, o todėl, kad pernelyg dideli šuoliai mūsų nervų sistemai atrodo grėsmingi.',
			},
			{ t: 'h', x: 'Pradėk nuo gėdingai mažo žingsnio' },
			{
				t: 'p',
				x: 'Vietoje „valgysiu sveikai visą savaitę“ pasirink vieną mažą, lengvai įvykdomą veiksmą: stiklinė vandens prabudus, viena daržovė prie pietų, dešimt minučių pasivaikščiojimo. Toks žingsnis turi būti toks mažas, kad jį atlikti būtų lengviau nei praleisti.',
			},
			{ t: 'q', x: 'Įpročiai išlieka ne dėl motyvacijos, o dėl pasikartojimo, kuris nebevargina.' },
			{
				t: 'p',
				x: 'Kai mažas veiksmas tampa savaime suprantamu, jį natūraliai norisi praplėsti. Taip auga ne tik įprotis, bet ir pasitikėjimas savimi — kiekvienas ištesėtas pažadas sau yra įrodymas, kad gali.',
			},
			{
				t: 'p',
				x: 'Pokytis nėra sprintas. Tai švelnus, kantrus judėjimas ta pačia kryptimi — net jei kartais tenka sustoti.',
			},
		],
	},
	{
		id: 'fbb11ff5-8ebe-45c4-8e47-1fe03d4a20ab',
		slug: 'klientes-istorija',
		featured: false,
		cat: 'Istorijos',
		title: '„Pirmą kartą nustojau skaičiuoti kalorijas ir atsikvėpiau"',
		excerpt:
			'Vienos bendruomenės narės kelionė nuo nuolatinio savęs ribojimo prie ramaus, sąmoningo santykio su maistu ir savimi.',
		img: '/og-articles/article-kitchen.webp',
		author: 'Be žalos',
		date: '2025 03 18',
		readTime: '9 min',
		body: [
			{
				t: 'p',
				x: 'Kai Ieva atėjo į bendruomenę, ji jau buvo išbandžiusi viską: dešimtis dietų, kalorijų skaičiuokles, savaitgalius be angliavandenių. „Žinojau viską apie maistą, bet nieko nebejaučiau apie save“, — prisimena ji.',
			},
			{ t: 'h', x: 'Pokytis prasidėjo ne nuo lėkštės' },
			{
				t: 'p',
				x: 'Pirmas žingsnis buvo netikėtas — ne naujas planas, o leidimas sustoti. Vietoje skaičiavimo Ieva pradėjo stebėti, kaip jaučiasi prieš ir po valgio. Iš pradžių tai gąsdino: be skaičių atrodė, kad viskas išslys iš rankų.',
			},
			{ t: 'q', x: '„Pamažu supratau, kad kūnas pats žino, kada gana — tik buvau pamiršusi jo klausytis.“' },
			{
				t: 'p',
				x: 'Per kelis mėnesius dingo vakariniai apsivalgymai, o kartu — ir nuolatinė kaltė. „Pirmą kartą per daugelį metų galėjau suvalgyti gabalėlį torto ir tiesiog mėgautis, nesvarstydama, kiek dabar reikės atidirbti“, — sako Ieva.',
			},
			{
				t: 'p',
				x: 'Jos istorija nėra apie tobulą mitybą. Ji apie tai, kaip atgauti ramybę ir pasitikėjimą savimi — žingsnis po žingsnio, be žalos.',
			},
		],
	},
	{
		id: '048f4c42-cbfa-4c88-b52e-7f4faaf598ad',
		slug: 'uzkandziai-be-kaltes',
		featured: false,
		cat: 'Mityba',
		title: 'Užkandžiai be kaltės: ką turėti po ranka',
		excerpt:
			'Sotus ir paprastas užkandis gali sustabdyti vakarinį apsivalgymą. Keletas idėjų, kurias paruoši per kelias minutes.',
		img: '/og-articles/article-plate.webp',
		author: 'Sandra Jatulytė',
		date: '2025 03 04',
		readTime: '4 min',
		body: [
			{
				t: 'p',
				x: 'Užkandis nėra „nuodėmė“ tarp valgymų — tai normali kūno poreikio dalis. Kai po ranka turime sotaus ir paprasto maisto, daug rečiau pasiekiame nekontroliuojamą alkį, dėl kurio vėliau prisivalgome.',
			},
			{ t: 'h', x: 'Soties trijulė: baltymai, skaidulos, riebalai' },
			{
				t: 'p',
				x: 'Geras užkandis derina bent du iš trijų: baltymus, skaidulas ir sveikus riebalus. Pavyzdžiui — graikiškas jogurtas su uogomis, kietas kiaušinis, sauja riešutų su vaisiumi arba daržovės su humusu.',
			},
			{ t: 'q', x: 'Pasiruošk soties variantą iš anksto — alkanai sau pasirinkti sunku.' },
			{
				t: 'p',
				x: 'Svarbiausia — neturėti tikslo „kuo mažiau“. Tikslas yra pasisotinti tiek, kad iki kito valgio jaustumeisi rami, o ne išalkusi ir susierzinusi.',
			},
		],
	},
	{
		id: '912d6745-92c8-4694-af2f-794180369c5d',
		slug: 'apetito-bangos',
		featured: false,
		cat: 'Emocinis valgymas',
		title: 'Apetito bangos vakare: iš kur jos kyla',
		excerpt:
			'Vakarinis alkis dažnai turi mažiau bendro su maistu, nei atrodo. Kalbamės apie nuovargį, įtampą ir kaip į juos atsiliepti.',
		img: '/og-articles/article-stress.webp',
		author: 'Sandra Jatulytė',
		date: '2025 02 20',
		readTime: '6 min',
		body: [
			{
				t: 'p',
				x: 'Diena baigta, namai tylūs — ir staiga užplūsta neaiškus noras kažko užkąsti. Vakarinės apetito bangos pažįstamos daugeliui ir dažnai turi mažiau bendro su tikru alkiu, nei atrodo.',
			},
			{ t: 'h', x: 'Nuovargis kalba alkio kalba' },
			{
				t: 'p',
				x: 'Po įtemptos dienos nervų sistema ieško greito nusiraminimo, o maistas — lengviausiai pasiekiamas būdas. Be to, jei dieną valgei per mažai arba praleidai valgymus, vakare kūnas teisėtai reikalauja to, ko trūko.',
			},
			{
				t: 'p',
				x: 'Pirmas žingsnis — pasitikrinti pamatus: ar šiandien pakankamai valgiau, miegojau, ilsėjausi? Dažnai vakarinį alkį numalšina ne dar viena porcija, o ankstesnis, sotesnis valgymas dieną.',
			},
			{ t: 'q', x: 'Vakaro alkis dažnai yra prašymas pailsėti, ne pavalgyti.' },
			{
				t: 'p',
				x: 'Jei bangą atpažįsti kaip emocinę, pabandyk švelnų ritualą be maisto: šiltą dušą, arbatą, knygą, kelias gilias įkvėpimo minutes. O jei vis tiek nori užkąsti — padaryk tai ramiai, be kaltės.',
			},
		],
	},
];

/** Comments used to seed a fresh article discussion. */
export interface SeedComment {
	name: string;
	date: string;
	text: string;
	likes: number;
}

export const seedComments: SeedComment[] = [
	{
		name: 'Greta',
		date: '2025 05 13',
		text: 'Ačiū už šį tekstą. Pirmą kartą perskaičiau kažką apie valgymą be kaltinimo ir spaudimo. Labai reikėjo.',
		likes: 12,
	},
	{
		name: 'Monika',
		date: '2025 05 13',
		text: 'Tas stabtelėjimas prieš atidarant šaldytuvą man tikrai padeda. Iš pradžių atrodė keista, dabar — natūralu.',
		likes: 7,
	},
	{
		name: 'Rūta',
		date: '2025 05 12',
		text: 'Skaitau ir atpažįstu save. Smagu žinoti, kad nesu viena su tokiais vakarais.',
		likes: 4,
	},
];

/** Look up a single article by its URL slug. */
export const getArticleBySlug = (slug: string | undefined): Article | undefined =>
	slug ? articles.find((article) => article.slug === slug) : undefined;

/** Other articles to surface under "Skaityk toliau". */
export const getRelatedArticles = (id: string, count = 3): Article[] =>
	articles.filter((article) => article.id !== id).slice(0, count);
