import { useParams } from 'react-router-dom';

import { Box } from '../../../../../components/Shared';
import { useAuth } from '../../../../auth';
import type { UserData } from '../../../../auth/core/services';
import { useAuthModal } from '../../../../auth/modal/hooks/useAuthModal';
import { Comments, VideoInfo, VideoLoading, VideoNotFound, VideoPlayer } from '../../components/virtuveVideo';
import type { VideoCategory } from '../../components/virtuveVideo/VideoInfo/types';
import { useVirtuveVideoPage } from '../../hooks/useVirtuveVideoPage';

import VirtuveVideoSEO from './VirtuveVideoSEO';

import styles from './VirtuveVideoPage.module.scss';

export interface ActionAccess {
	allowed: boolean;
	forbidden: 'course' | 'subscription' | 'login' | 'noOne';
}
const getActionAccess = (user: UserData | null, category: VideoCategory): ActionAccess => {
	const subscriptionCategories: VideoCategory[] = ['Pokalbis', 'Trumpai', 'Vebinaras'];
	if (!user) return { allowed: false, forbidden: 'login' };

	if (category === 'Kursai' && !user.is_course) return { allowed: false, forbidden: 'course' };

	const hasSubscription =
		(user.u_status === 'Virtuvė' ||
			user.u_status === 'Cancel_virtuve' ||
			user.u_status === 'Virtuvė Plus' ||
			user.u_status === 'Cancel_virtuve_plus' ||
			user.s_status === 'virtuve' ||
			user.s_status === 'virtuve_plus') &&
		(user.user_s_subscription || user.user_subscription);

	if (subscriptionCategories.includes(category) && !hasSubscription) return { allowed: false, forbidden: 'subscription' };

	return { allowed: true, forbidden: 'noOne' };
};

export const VirtuveVideoPage = () => {
	const { user } = useAuth();
	const { slug } = useParams();
	const { authOpenModal } = useAuthModal();
	const { data: video, isPending: isPendingVideo, isError } = useVirtuveVideoPage(user, slug);

	const actionAccess = video ? getActionAccess(user, video.category) : ({ allowed: false, forbidden: 'noOne' } as ActionAccess);

	return (
		<div className={styles.root}>
			{video && <VirtuveVideoSEO video={video} />}
			{/* ── MAIN LAYOUT ── */}
			<div className={styles.layout}>
				{/* ── LEFT COLUMN ── */}

				<main>
					{isPendingVideo ? (
						<VideoLoading />
					) : isError || !video ? (
						<VideoNotFound />
					) : (
						<>
							<VideoPlayer video={video} />

							<Box padding={['20px', '0', '0', '0']}>
								<VideoInfo user={user} video={video} actionAccess={actionAccess} />
								<Comments
									user={user}
									videoId={video.id}
									actionAccess={actionAccess}
									onOpenAuthModal={() => authOpenModal('auth')}
								/>
							</Box>
						</>
					)}
				</main>
			</div>
		</div>
	);
};
