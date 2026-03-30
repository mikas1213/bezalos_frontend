import type { UserData } from '../../../../../auth/core/services';
import type { ActionAccess } from '../../../pages/VirtuveVideoPage/VirtuveVideoPage';

export interface CommentsProps {
	user: UserData | null;
	videoId?: string;
	actionAccess: ActionAccess;
	onOpenAuthModal: () => void;
}
