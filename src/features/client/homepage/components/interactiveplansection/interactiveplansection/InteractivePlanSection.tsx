import styles from './InteractivePlanSection.module.css';
import { useEffect, useState, useRef } from 'react';
import { useMediaQuery } from '../../../../../../contexts/MediaQueryProvider';
import { InteractiveCard } from '../interactivecard/InteractiveCard';
import {
	Box,
	Container,
	Cluster,
	Stack,
} from '../../../../../../components/Shared';
import { Icon1, Icon2, Icon3, Icon4 } from '../icons';
import video1 from '../../../../../../assets/videos/homepage/video1.mp4';
import video2 from '../../../../../../assets/videos/homepage/video2.mp4';
import video3 from '../../../../../../assets/videos/homepage/video3.mp4';
import { type Card } from '../types';


const cards: Card[] = [
	{
		id: 0,
		icon: <Icon1 />,
		title: 'Produktų keitimas plane',
		desc: 'Jei neturi reikiamo produkto ši fukncija leis lengvai rasti alternatyvą ir perskaičiuos kiekį',
		photo: video1,
		disabled: false,
	},
	{
		id: 1,
		icon: <Icon2 />,
		title: 'Produktų keitimas',
		desc: 'Galėsi rinktis iš dešimčių produktų alternatyvų jei atsibodo valgyti vieną ar kitą produktą',
		photo: video2,
		disabled: false,
	},
	{
		id: 2,
		icon: <Icon3 />,
		title: 'Receptų sudarymas',
		desc: 'Galėsi kurti savo mėgstamus receptus visiškai nenukrypstant nuo mitybos plano',
		photo: video3,
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
	const mediaQuery = useMediaQuery();
	const [selected, setSelected] = useState<number>(() => {
        return mediaQuery < 577 ? 4 : 0;
    });

	const scrollContainer = useRef<HTMLDivElement>(null);
	const isScrollingRef = useRef(false);
    const scrollEndTimerRef = useRef<number | null>(null);
    
	const allCards: Card[] = [...cards, ...cards, ...cards].filter(card => card.id !== 3).map((card, i) => ({
		...card,
		id: i,
	}));

    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;
        setTimeout(() => {
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }, 100);
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

             if (!isScrollingRef.current) {
                isScrollingRef.current = true;
            }

            if (scrollEndTimerRef.current) {
                cancelAnimationFrame(scrollEndTimerRef.current);
            }

            scrollEndTimerRef.current = requestAnimationFrame(() => {
                scrollEndTimerRef.current = requestAnimationFrame(() => {
                    isScrollingRef.current = false;
                    setSelected(index % allCards.length);
                });
            });

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
        
        container.addEventListener('scroll', handleScroll);
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollEndTimerRef.current) {
                cancelAnimationFrame(scrollEndTimerRef.current);
            }
        }
    }, []);

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
										selected: selected === i
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
							{/* <img src={allCards[selected].photo} alt='' /> */}

                            <video key={selected} width='100%' autoPlay muted loop playsInline className="phone-video">
                                <source 
                                    src={allCards[selected].photo} 
                                    type='video/mp4' 
                                />
                            </video>
						</div>
					</div>

                    {/* <div className="phone-frame">
                        <video autoPlay muted loop playsInline className="phone-video">
                            <source src={video} type="video/webm" />
                        </video>
                    </div> */}

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
