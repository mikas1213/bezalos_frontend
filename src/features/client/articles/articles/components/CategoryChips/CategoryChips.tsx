interface CategoryChipsProps {
	categories: readonly string[];
	active: string;
	onChange: (category: string) => void;
}

export const CategoryChips = ({ categories, active, onChange }: CategoryChipsProps) => {
	return (
		<div className="bz-chiprow bz-art-chiprow">
			{categories.map((category) => (
				<button
					key={category}
					type="button"
					className={`bz-chip ${active === category ? 'active' : ''}`}
					onClick={() => onChange(category)}
				>
					{category}
				</button>
			))}
		</div>
	);
};
