import { useEffect, useReducer, useRef } from 'react';
import { createPortal } from 'react-dom';

import cx from 'classnames';
import { Lock, X } from 'lucide-react';

import styles from './AccessToast.module.scss';

interface AccessNotificationProps {
	title: string;
	description: string;
	isOpen: boolean;
	position: { top: number; left?: number; right?: number };
	onClose: () => void;
	primaryLabel?: string;
	onPrimary?: () => void;
	duration?: number;
}

type State = { visible: boolean; progress: number };
type Action = { type: 'SHOW' } | { type: 'HIDE' } | { type: 'TICK'; step: number };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case 'SHOW':
			return { visible: true, progress: 100 };
		case 'HIDE':
			return { visible: false, progress: 100 };
		case 'TICK':
			return { ...state, progress: Math.max(0, state.progress - action.step) };
	}
}

export const AccessToast = ({
	title,
	description,
	isOpen,
	position,
	onClose,
	primaryLabel = 'Peržiūrėti pasiūlymą',
	onPrimary,
	duration = 12000,
}: AccessNotificationProps) => {
	const [state, dispatch] = useReducer(reducer, { visible: false, progress: 100 });
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		if (!isOpen) {
			dispatch({ type: 'HIDE' });
			clearInterval(intervalRef.current!);
			clearTimeout(closeTimerRef.current!);
			return;
		}

		// rAF užtikrina, kad DOM jau sumontavęs prieš pridedant .visible klasę
		const raf = requestAnimationFrame(() => dispatch({ type: 'SHOW' }));

		closeTimerRef.current = setTimeout(onClose, duration);

		const step = 100 / (duration / 50);
		intervalRef.current = setInterval(() => dispatch({ type: 'TICK', step }), 50);

		return () => {
			cancelAnimationFrame(raf);
			clearInterval(intervalRef.current!);
			clearTimeout(closeTimerRef.current!);
		};
	}, [isOpen, duration, onClose]);

	if (!isOpen) return null;

	const handlePrimary = () => {
		onPrimary?.();
		onClose();
	};

	return createPortal(
		<div
			className={cx(styles.notification, state.visible && styles.visible)}
			role="alert"
			style={{ top: position.top, left: position.left, right: position.right }}
		>
			<div className={styles.progressBar}>
				<div className={styles.progressFill} style={{ width: `${state.progress}%` }} />
			</div>
			<div className={styles.body}>
				<div className={styles.header}>
					<div className={styles.icon}>
						<Lock size={16} strokeWidth={2} />
					</div>
					<div className={styles.texts}>
						<p className={styles.title}>{title}</p>
						<p className={styles.desc}>{description}</p>
					</div>
					<button type="button" className={styles.close} onClick={onClose} aria-label="Uždaryti">
						<X />
					</button>
				</div>
				<div className={styles.actions}>
					<button type="button" className={cx(styles.btn, styles.btnPrimary)} onClick={handlePrimary}>
						{primaryLabel}
					</button>
					<button type="button" className={cx(styles.btn, styles.btnSecondary)} onClick={onClose}>
						Uždaryti
					</button>
				</div>
			</div>
		</div>,
		document.body,
	);
};
