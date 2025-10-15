import { useState, useEffect } from 'react';

type Options = {
    delay?: number,
    initialValue?: boolean
};

export const useIsMounted = (options: Options = {}): boolean => {
    const { delay = 0, initialValue = false } = options;
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

    return isMounted;
};