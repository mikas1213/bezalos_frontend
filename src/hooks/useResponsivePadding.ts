import { useMediaQuery } from '../contexts';

type Paddings = 'var(--content-padding-xs)' | 'var(--content-padding-sm)' | 'var(--content-padding-lg)';

export const useResponsivePadding = (): Paddings => {
    const mediaQuery = useMediaQuery();
    if(mediaQuery < 376) return 'var(--content-padding-xs)';
    if(mediaQuery < 577) return 'var(--content-padding-sm)';
    return 'var(--content-padding-lg)';
};