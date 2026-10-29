import { useEffect, useId, useRef, useState } from 'react';

import { Check, ChevronDown } from 'lucide-react';

import { type ActivityId, KALORIJOS_ACTIVITIES } from '../../constants/KalorijosActivities';

import styles from './KalorijosActivitySelect.module.scss';

interface KalorijosActivitySelectProps {
	value: ActivityId | null;
	onChange: (id: ActivityId) => void;
}

const PLACEHOLDER = 'Pasirink aktyvumo lygį';

/** Aktyvumo pasirinkimas: mygtukas su pasirinktu lygiu ir iškrentantis sąrašas su ikonomis ir paaiškinimais. */
export const KalorijosActivitySelect = ({ value, onChange }: KalorijosActivitySelectProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const labelId = useId();
	const listId = useId();

	const selected = KALORIJOS_ACTIVITIES.find((activity) => activity.id === value);

	// Atidarytą sąrašą uždaro paspaudimas šalia ir Escape (fokusas grįžta ant mygtuko).
	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const onPointerDown = (e: PointerEvent) => {
			if (!rootRef.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsOpen(false);
				triggerRef.current?.focus();
			}
		};
		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [isOpen]);

	const pick = (id: ActivityId) => {
		onChange(id);
		setIsOpen(false);
		triggerRef.current?.focus();
	};

	return (
		<div ref={rootRef} className={styles.activity}>
			<span id={labelId} className={styles.label}>
				Aktyvumas
			</span>
			<button
				ref={triggerRef}
				type="button"
				className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ''}`}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				aria-controls={listId}
				aria-labelledby={labelId}
				onClick={() => setIsOpen((open) => !open)}
			>
				{selected && (
					<span className={styles.triggerIcon} aria-hidden="true">
						{selected.icon}
					</span>
				)}
				<span className={`${styles.triggerText} ${selected ? '' : styles.placeholder}`}>
					{selected?.title ?? PLACEHOLDER}
				</span>
				<ChevronDown className={styles.chevron} aria-hidden="true" />
			</button>

			<ul id={listId} role="listbox" aria-labelledby={labelId} className={`${styles.list} ${isOpen ? styles.listOpen : ''}`}>
				{KALORIJOS_ACTIVITIES.map((activity) => {
					const isSelected = activity.id === value;
					return (
						<li key={activity.id} role="option" aria-selected={isSelected}>
							<button
								type="button"
								tabIndex={isOpen ? 0 : -1}
								className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
								onClick={() => pick(activity.id)}
							>
								<span className={styles.optionIcon} aria-hidden="true">
									{activity.icon}
								</span>
								<span className={styles.optionText}>
									<span className={styles.optionTitle}>{activity.title}</span>
									<span className={styles.optionDescription}>{activity.description}</span>
								</span>
								{isSelected && <Check className={styles.check} aria-hidden="true" />}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
