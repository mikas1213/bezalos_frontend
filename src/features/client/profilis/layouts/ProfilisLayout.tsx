import { type Dispatch, type SetStateAction, useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { usePageMeta } from '../../../../hooks';
import { hasActiveSubscription, useAuth } from '../../../auth';
import { ProfilisNavbar } from '../components/ProfilisNavbar';
import { useProfile } from '../hooks/useProfile';
import type { ProfilisOutletContext, UserPlan } from '../types';
import { getErrorMessage } from '../utils/getErrorMessage';

import styles from './ProfilisLayout.module.scss';

/**
 * Profilio layout'as: skilčių navbar'as, puslapio meta ir minimalus kontekstas vaikams.
 * Duomenis puslapiai imasi patys per useProfile / useProducts, todėl Outlet krovimo metu neblokuojamas.
 * Klaidos atveju vietoj Outlet rodomas pranešimas su „Bandyti dar kartą“.
 */
const ProfilisLayout = () => {
	usePageMeta({ title: 'Be žalos | Profilis', background: '#fff' });

	const { user } = useAuth();
	const userId = user?.user_id;
	const { plans, isError, isFetching, error, refetch } = useProfile(userId);

	// Kol vartotojas nepasirinko ar nepakeitė plano, rodomas pirmas iš užklausos. Be sinchronizuojančio efekto.
	const [selectedPlanState, setSelectedPlanState] = useState<UserPlan | null>(null);
	const selectedPlan = selectedPlanState ?? plans[0] ?? null;
	const setSelectedPlan = useCallback<Dispatch<SetStateAction<UserPlan | null>>>(
		(action) => {
			setSelectedPlanState((prev) => (typeof action === 'function' ? action(prev ?? plans[0] ?? null) : action));
		},
		[plans],
	);

	// ProtectedRoute įleidžia tik prisijungusį vartotoją, todėl čia tik tipo susiaurinimas.
	if (!userId) {
		return null;
	}

	const context: ProfilisOutletContext = {
		userId,
		isSubscribed: hasActiveSubscription(user),
		selectedPlan,
		setSelectedPlan,
	};

	return (
		<>
			<div className={styles.shell}>
				<ProfilisNavbar />
			</div>
			{isError ? (
				<div className={styles.shell}>
					<div className={styles.error} role="alert">
						<p className={styles.errorText}>Nepavyko užkrauti profilio: {getErrorMessage(error)}</p>
						<button type="button" className={styles.retryBtn} onClick={() => refetch()} disabled={isFetching}>
							{isFetching ? 'Kraunama...' : 'Bandyti dar kartą'}
						</button>
					</div>
				</div>
			) : (
				<Outlet context={context} />
			)}
		</>
	);
};

export default ProfilisLayout;
