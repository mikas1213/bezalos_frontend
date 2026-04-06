import type { UserData } from '../../../auth/core/services';
export const queryKeys = {
	video: (slug: string | undefined, user?: UserData | null) => [
		'video',
		user?.user_name,
		user?.is_course,
		user?.user_s_subscription,
		slug,
	],
};
