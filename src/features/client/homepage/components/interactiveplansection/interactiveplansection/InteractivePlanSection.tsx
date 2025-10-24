import styles from './InteractivePlanSection.module.css';
import { useEffect, useState, useRef, type ReactNode } from 'react';
import { useMediaQuery } from '../../../../../../contexts/MediaQueryProvider';
import { InteractiveCard } from '../interactivecard/InteractiveCard';
import {
	Box,
	Container,
	Cluster,
	Stack,
} from '../../../../../../components/Shared';
import { Icon1, Icon2, Icon3, Icon4 } from '../icons';
import phone1 from '../../../../../../assets/images/homepage/phone-mitybos-planas.webp';
import phone2 from '../../../../../../assets/images/homepage/phone-produktu-keitimas.webp';
import phone3 from '../../../../../../assets/images/homepage/phone-receptu-sudarymas.webp';
import { type Card } from '../types';

const cards: Card[] = [
	{
		id: 0,
		icon: <Icon1 />,
		title: 'Produktų keitimas plane',
		desc: 'Jei neturi reikiamo produkto ši fukncija leis lengvai rasti alternatyvą ir perskaičiuos kiekį',
		photo: phone1,
		disabled: false,
	},
	{
		id: 1,
		icon: <Icon2 />,
		title: 'Produktų keitimas',
		desc: 'Galėsi rinktis iš dešimčių produktų alternatyvų jei atsibodo valgyti vieną ar kitą produktą',
		photo: phone2,
		disabled: false,
	},
	{
		id: 2,
		icon: <Icon3 />,
		title: 'Receptų sudarymas',
		desc: 'Galėsi kurti savo mėgstamus receptus visiškai nenukrypstant nuo mitybos plano',
		photo: phone3,
		disabled: false,
	},
	{
		id: 3,
		icon: <Icon4 />,
		title: 'Mitybos sekimas',
		desc: 'Maisto produktų bazė, kuri leis tau sekti savo mitybos įpročius bei siekti norimų tikslų',
		photo: '',
		disabled: true,
	},
];

export const InteractivePlanSection = () => {
	const phones = [phone1, phone2, phone3];
	const mediaQuery = useMediaQuery();
	const [selected, setSelected] = useState<number>(4);

	const scrollContainer = useRef<HTMLDivElement>(null);
	const isScrollingRef = useRef(false);

	const allCards: Card[] = [...cards, ...cards, ...cards].filter(card => card.id !== 3).map((card, i) => ({
		...card,
		id: i,
	}));

    useEffect(() => {
    const container = scrollContainer.current;
    if (!container) return;
    
    // Laukiam kol DOM pilnai užsikrauna
    const initScroll = () => {
        const singleSetWidth = container.scrollWidth / 3;
        if (singleSetWidth > 0) {
            container.scrollLeft = singleSetWidth;
        }
    };
    
    // Bandome iš karto
    initScroll();
    
    // Ir dar kartą po trumpo delay (production safety)
    const timer = setTimeout(initScroll, 100);
    
    return () => clearTimeout(timer);
}, []);
    
    useEffect(() => {
        const container = scrollContainer.current
        if(!container) return;
        const handleScroll = () => {
            const cardElement = container.querySelector('[class*=interactiveCard]') as HTMLElement;
            if (!cardElement) return;
            const cardWidth = cardElement.offsetWidth;
            const scrollLeft = container.scrollLeft;
            const index = Math.round(scrollLeft / cardWidth);
            setSelected(index % allCards.length);



            const singleSetWidth = container.scrollWidth / 3;

			if (scrollLeft <= 10) {
				
				isScrollingRef.current = true;
				container.scrollLeft = singleSetWidth + scrollLeft;
				setTimeout(() => {
					isScrollingRef.current = false;
				}, 50);
			}

			if (scrollLeft >= singleSetWidth * 2 - 10) {
				
				isScrollingRef.current = true;
				container.scrollLeft =
					singleSetWidth + (scrollLeft - singleSetWidth * 2);
				setTimeout(() => {
					isScrollingRef.current = false;
				}, 50);
			}
        };

        container.addEventListener('scrollend', handleScroll);
        return () => container.removeEventListener('scrollend', handleScroll);
    }, [allCards.length]);
    
	// useEffect(() => {
	// 	const container = scrollContainer.current;
	// 	if (!container) return;

	// 	const initScroll = setTimeout(() => {
	// 		const totalWidth = container.scrollWidth;
	// 		const containerWidth = container.clientWidth;
	// 		container.scrollLeft = totalWidth / 3;

	// 	}, 100);

	// 	const handleScroll = () => {
	// 		if (isScrollingRef.current) return;

	// 		const { scrollLeft, scrollWidth, clientWidth } = container;
	// 		const singleSetWidth = scrollWidth / 3;

	// 		if (scrollLeft <= 10) {
				
	// 			isScrollingRef.current = true;
	// 			container.scrollLeft = singleSetWidth + scrollLeft;
	// 			setTimeout(() => {
	// 				isScrollingRef.current = false;
	// 			}, 500);
	// 		}

	// 		if (scrollLeft >= singleSetWidth * 2 - 10) {
				
	// 			isScrollingRef.current = true;
	// 			container.scrollLeft =
	// 				singleSetWidth + (scrollLeft - singleSetWidth * 2);
	// 			setTimeout(() => {
	// 				isScrollingRef.current = false;
	// 			}, 500);
	// 		}
	// 	};

	// 	container.addEventListener('scroll', handleScroll, { passive: true });

	// 	return () => {
	// 		clearTimeout(initScroll);
	// 		container.removeEventListener('scroll', handleScroll);
	// 	};
	// }, []);

	return (
		<Container
			as='section'
			id='interactiveplan'
			maxWidth='100vw'
			padding='0'
			className='section--hidden padding--b'
		>
			<Stack space='var(--s-lg-desk)'>
				<Container>
					<Stack
						className={styles.header}
						space={mediaQuery < 577 ? 'var(--s-lg-mobi)' : '0'}
					>
						<Box className={styles.title}>
							Pavargai nuolat pirkti naują planą?
						</Box>
						<Box className={styles.subTitle}>
							Interaktyvus mitybos planas su neribotom galimybėm
							keisti produktus, kurti ir skaičiuoti receptus
						</Box>
					</Stack>
				</Container>

				{mediaQuery < 577 && (
					<div className={styles.carouselWrapper}>
						<div
							ref={scrollContainer}
							className={styles.scrollContainer}
						>
							{allCards.map((card, i) => (
								<InteractiveCard
									key={i}
									card={card}
									{...(!card.disabled && {
										selected: selected === i,
										// setSelected,
									})}
								/>
							))}
						</div>
					</div>
				)}

				<Container>
					<div className={styles.body}>
						{mediaQuery > 576 && (
							<>
								{cards.map((card, i) => (
									<InteractiveCard
										key={i}
										card={card}
										{...(!card.disabled && {
											selected: selected === i,
											setSelected,
										})}
									/>
								))}
							</>
						)}
						<div className={styles.phone}>
							<img src={allCards[selected].photo} alt='' />
						</div>
					</div>

					<Cluster className={styles.bottom} justify='space-around'>
						<Stack className={styles.item}>
							<Box className={styles.itemTitle}>300+</Box>
							<Box className={styles.itemLabel}>
								Maisto produktų
							</Box>
						</Stack>
						<Stack className={styles.item}>
							<Box className={styles.itemTitle}>180+</Box>
							<Box className={styles.itemLabel}>
								Skirtingų receptų
							</Box>
						</Stack>
						<Stack className={styles.item}>
							<Box className={styles.itemTitle}>100+</Box>
							<Box className={styles.itemLabel}>
								Numestų kilogramų
							</Box>
						</Stack>
					</Cluster>
				</Container>
			</Stack>
		</Container>
	);
};
