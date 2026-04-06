import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './DeleteModal.module.scss';

interface DeleteModalProps {
	pendingDeleteId: string | null;
	setPendingDeleteId: Dispatch<SetStateAction<string | null>>;
	confirmDelete: () => void;
}

export const DeleteModal = ({ pendingDeleteId, setPendingDeleteId, confirmDelete }: DeleteModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (pendingDeleteId && modalRef.current) {
			setTimeout(() => {
				modalRef.current?.focus();
			}, 0);
		}
	}, [pendingDeleteId]);
	if (!pendingDeleteId) return null;
	return createPortal(
		<>
			<div className={styles.deleteOverlay} onClick={() => setPendingDeleteId(null)} />
			<div
				ref={modalRef}
				tabIndex={0}
				className={styles.deleteModal}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						confirmDelete();
					}
					if (e.key === 'Escape') {
						e.preventDefault();
						setPendingDeleteId(null);
					}
				}}
			>
				<div className={styles.deleteIcon}>
					<svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
						<path d="M9 6V4h6v2" />
					</svg>
				</div>
				<p className={styles.deleteTitle}>Ištrinti?</p>
				<p className={styles.deleteSubtitle}>Šio veiksmo anuliuoti negalėsite.</p>
				<div className={styles.deleteActions}>
					<button type="button" className={styles.deleteBtnCancel} onClick={() => setPendingDeleteId(null)}>
						Atšaukti
					</button>
					<button type="button" className={styles.deleteBtnConfirm} onClick={confirmDelete}>
						Ištrinti
					</button>
				</div>
			</div>
		</>,
		document.body,
	);
};
