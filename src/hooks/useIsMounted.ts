import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
type Options = {
	delay?: number;
	initialValue?: boolean;
};

type UseIsMountedReturn = {
	isMounted: boolean;
	setIsMounted: Dispatch<SetStateAction<boolean>>;
};

export const useIsMounted = (options?: Options): UseIsMountedReturn => {
	const { delay = 0, initialValue = false } = options || {};
	const [isMounted, setIsMounted] = useState<boolean>(initialValue);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsMounted(true);
		}, delay);

		return () => {
			clearTimeout(timer);
			setIsMounted(false);
		};
	}, [delay]);

	return { isMounted, setIsMounted };
};
