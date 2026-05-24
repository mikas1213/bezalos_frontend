import { useState } from 'react';

import styles from './HelpTip.module.scss';

type Props = {
	text: string;
	featured: boolean;
	dim: boolean;
};

export function HelpTip({ text, featured, dim }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<span
			className={styles.trigger}
			data-featured={featured}
			data-dim={dim}
			data-open={open}
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
			onFocus={() => setOpen(true)}
			onBlur={() => setOpen(false)}
			tabIndex={0}
			role="button"
			aria-label={text}
		>
			i
			<span className={styles.tooltip}>
				{text}
				<span className={styles.arrow} />
			</span>
		</span>
	);
}
