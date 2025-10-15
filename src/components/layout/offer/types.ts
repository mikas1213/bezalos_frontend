import type { ReactNode } from 'react';
import { type CookieSetOptions } from 'universal-cookie';

export type OfferInputData = {
    email: string;
};

export type OfferProps = {
    setIsShowOffer: (value: boolean | ((prev: boolean) => boolean)) => void,
    setIsOfferSent: (value: boolean | ((prev: boolean) => boolean)) => void,
    isOfferSent: Boolean,
    setCookie: (name: 'COOKIE_OFFER', value: any, options?: CookieSetOptions) => void;
};

export type ServerErrorResponse = {
    errors: Array<{
        path: string;
        msg: string;
    }>;
};

export type OfferFormData = {
    email: string
};

export type OverlayProps = {
    children: ReactNode,
    handleSentOffer: () => void
};