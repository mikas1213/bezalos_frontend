import { useEffect, useRef, useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import type { PaslaugaDetails } from '../../services/paslaugosService';

import styles from './Accordion.module.scss';

const AccordionItem = ({ icon, title, desc }: Omit<PaslaugaDetails, 'id'>) => {
	const [isOpen, setIsOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setContentHeight(contentRef.current.scrollHeight);
		}
	}, [desc]);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`${styles.accordionItem} ${isOpen ? styles.open : ''}`}>
			<div className={styles.accordionItemHeader} onClick={toggleAccordion}>
				<span>{icon}</span>
				<span className={styles.accordionTitle}>{title}</span>
				<ChevronLeft className={styles.icon} />
			</div>

			<div ref={contentRef} style={{ height: isOpen ? `${contentHeight}px` : '0' }} className={styles.accordionContent}>
				<div className={styles.accordionContentInner}>{desc}</div>
			</div>
		</div>
	);
};

export const Accordion = ({ paslaugaDetails }: { paslaugaDetails: PaslaugaDetails[] }) => {
	return (
		<div className={styles.accordion}>
			{paslaugaDetails.map((item) => (
				<AccordionItem key={item.id} icon={item.icon} title={item.title} desc={item.desc} />
			))}
		</div>
	);
};
