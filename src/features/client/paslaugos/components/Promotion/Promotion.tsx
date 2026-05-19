import { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { axiosPrivate } from '../../../../../api/axios';
import { PromotionSpinner } from '../PromotionSpinner/PromotionSpinner';

import type { PromotionProps } from './types';

import styles from './Promotion.module.scss';

export const Promotion = ({
	code,
	setCode,
	paslauga,
	setPaslauga,
	startPrice,
	isCodeApproved,
	setIsCodeApproved,
}: PromotionProps) => {
	const navigate = useNavigate();

	const [discountAmount, setDiscountAmount] = useState(0);
	const [isUserTyped, setIsUserTyped] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const validatePromotionCode = async (code: string) => {
		if (isCodeApproved) {
			console.log('Norėtum 🤣');
			return;
		}
		try {
			setIsLoading(true);
			const {
				data: { new_price, discount_amount },
			} = await axiosPrivate.post(`/promo/apply/${code}`, {
				service_id: paslauga.id,
				service_price: Number(paslauga.current_price),
			});

			setPaslauga((prev) => (prev ? { ...prev, current_price: new_price } : prev));
			setDiscountAmount(discount_amount);
			setIsLoading(false);
			setIsUserTyped(false);
			setIsCodeApproved(true);
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 401 || err.response?.status === 403) {
					navigate('/prisijungti');
				}
				setError(err.response?.data?.message ?? 'Įvyko klaida');
			}
			setIsLoading(false);
			setIsCodeApproved(false);
		}
	};

	return (
		<div className={styles.promotionCodeContainer}>
			{!isCodeApproved ? (
				<input
					type="text"
					value={code}
					onChange={(e) => {
						setCode(e.target.value?.toUpperCase());
						setIsUserTyped(true);
						setError('');
					}}
					className={`${styles.discountCode} ${code?.length > 0 ? styles.show : ''}`}
					placeholder="Pridėti nuolaidos kodą"
				/>
			) : (
				<div className={styles.approvedCode}>
					<div className={styles.code}>
						<span>{code.toUpperCase()}</span>
						<span
							onClick={() => {
								setIsCodeApproved(false);
								setPaslauga((prev) => (prev ? { ...prev, current_price: startPrice ?? prev.current_price } : prev));
								document.querySelector(`.${styles.applyCode}`)?.classList.add(styles.showApplyCode);
							}}
						>
							<IoIosCloseCircleOutline className={styles.closeIcon} />
						</span>
					</div>
					<span className={styles.discountValue}>-€{discountAmount}.00</span>
				</div>
			)}

			{!isLoading ? (
				<span
					onClick={() => validatePromotionCode(code)}
					className={`
                    ${styles.applyCode}
                    ${
						code.length > 0 && isUserTyped && error.length === 0
							? styles.showApplyCode
							: code.length === 0 && isUserTyped
								? styles.hideApplyCode
								: ''
					}`}
				>
					Taikyti
				</span>
			) : (
				<PromotionSpinner />
			)}
			{error && <span className={styles.promotionError}>{error}</span>}
		</div>
	);
};
