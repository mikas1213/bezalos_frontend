import type { ReactNode } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { CookieSetOptions } from 'universal-cookie';

export type OfferInputData = {
    email: string;
};

export type OfferProps = {
    setIsMounted: Dispatch<SetStateAction<boolean>>,
    setIsOfferSent: Dispatch<SetStateAction<boolean>>,
    isOfferSent: boolean,
    setCookie: (name: 'COOKIE_OFFER', value: any, options?: CookieSetOptions) => void;
};

export type ServerErrorResponse = {
    errors: Array<{
        path: string;
        msg: string;
    }>;
};

export type OverlayProps = {
    children: ReactNode,
    handleSentOffer: () => void
};