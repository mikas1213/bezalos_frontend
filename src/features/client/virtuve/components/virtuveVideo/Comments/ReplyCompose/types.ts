import type { Dispatch, SetStateAction } from 'react';

import type { UserData } from '../../../../../../auth/core/services';
import type { ActionAccess } from '../../../../pages/VirtuveVideoPage/VirtuveVideoPage';

type ReplyInput = Record<string, string>;

export interface ReplyComposeProps {
	user: UserData | null;
	commentId: string;
	replyInputs: ReplyInput;
	postReply: (commentId: string) => void;
	actionAccess: ActionAccess;
	setReplyInputs: Dispatch<SetStateAction<ReplyInput>>;
	openReplyCompose: Set<string>;
}
