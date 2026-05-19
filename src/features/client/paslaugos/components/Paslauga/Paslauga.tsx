import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';

import { usePayment } from '../../../../../contexts/PaymentProvider';
import type { PaslaugaDto } from '../../services/paslaugosService';
import { Accordion } from '../Accordion';
import { Promotion } from '../Promotion';

import styles from './Paslauga.module.scss';
interface PaslaugaProps {
	paslauga: PaslaugaDto;
	setPaslauga: Dispatch<SetStateAction<PaslaugaDto | undefined>>;
}
export const Paslauga = ({ paslauga, setPaslauga }: PaslaugaProps) => {
	const { handleServiceCheckout, isLoading } = usePayment();
	const [startPrice, setStartPrice] = useState(paslauga.current_price);
	const [code, setCode] = useState('');
	const [isCodeApproved, setIsCodeApproved] = useState(false);
	const prevPriceRef = useRef(paslauga.current_price);

	useEffect(() => {
		setStartPrice(prevPriceRef.current);
		prevPriceRef.current = paslauga.current_price;
	}, [paslauga.current_price]);

	return (
		<div className={styles.paslauga}>
			<div className={styles.left}>
				<img src={paslauga.image_l} alt={paslauga.title} className={styles.paslaugaImg} />
			</div>

			<div className={styles.right}>
				<div className={styles.paslaugaTitle}>{paslauga.title}</div>

				<div className={styles.paslaugaDesc}>{paslauga.basic_desc}</div>

				<div className={styles.price}>
					€
					<CountUp
						key={paslauga.current_price}
						start={parseFloat(startPrice)}
						end={parseFloat(paslauga.current_price)}
						decimals={2}
						duration={0.5}
						separator=""
					/>
					{paslauga.discount > 0 && <span className={styles.wasPrice}>€{paslauga.base_price}</span>}
				</div>

				<div className={styles.buyBtn}>
					{paslauga.is_active && paslauga.quantity > 0 ? (
						<button
							type="button"
							disabled={isLoading}
							onClick={() => handleServiceCheckout(paslauga, code, isCodeApproved)}
						>
							Tęsti pirkimą
						</button>
					) : (
						<button type="button" disabled={true}>
							IŠPARDUOTA
						</button>
					)}

					{paslauga.is_active && paslauga.discount === 0 && paslauga.quantity > 0 && (
						<Promotion
							code={code}
							setCode={setCode}
							paslauga={paslauga}
							setPaslauga={setPaslauga}
							startPrice={startPrice}
							isCodeApproved={isCodeApproved}
							setIsCodeApproved={setIsCodeApproved}
						/>
					)}
				</div>

				{paslauga.quantity < 4 && (
					<span className={styles.quantity}>
						Liko: {paslauga.quantity} <small>vnt.</small>
					</span>
				)}
				<Accordion paslaugaDetails={paslauga.details} />
			</div>
		</div>
	);
};
