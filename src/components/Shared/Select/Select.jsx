import { useEffect, useRef, useState } from 'react';

import { ChevronLeft } from 'lucide-react';
import { Check } from 'lucide-react';

import styles from './Select.module.css';

const Select = ({ options = [], label, name, value, handleFormInput, className = [] }) => {
	const [selectOpen, setSelectOpen] = useState(false);
	const refOptions = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (refOptions.current && !refOptions.current.contains(e.target)) {
				setSelectOpen(false);
			}
		};
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, []);

	return (
		<div className={`${styles.select} ${className}`}>
			<span className={styles.inputLabel}>{label}</span>
			<div
				className={`${styles.selectInput} ${selectOpen ? styles.open : ''}`}
				onClick={(e) => {
					setSelectOpen(!selectOpen);
					e.stopPropagation();
				}}
			>
				<span>{value}</span>
				<ChevronLeft className={styles.selectIcon} />
			</div>

			<div ref={refOptions} className={`${styles.options} ${selectOpen ? styles.showOptions : ''}`}>
				{options.map((option) => (
					<div
						key={option}
						data-name={name}
						data-value={option}
						className={styles.option}
						onClick={(e) => {
							handleFormInput(e);
							setSelectOpen(false);
						}}
					>
						<span>{option}</span>
						{option === value && <Check className={styles.icon} />}
					</div>
				))}
			</div>
		</div>
	);
};

export default Select;
