export const COOKIES = {
    CONSENT: {
        name: 'COOKIE_CONSENT',
        options: {
            path: '/',
            maxAge: 3600 * 24 * 365, // 1 metai
        },
    },
    TEST_RESULT: {
        name: 'bz_tr',
        values: {
            emocinis: 'EbDyMdvi',
            isorinis: 'IxZZYVxL',
            ribojantis: 'AMyBLYDb',
            main: 'MOUupILr',
            good: 'GkwTmAWl',
        } as const,
        options: {
            path: '/',
            maxAge: 3600 * 24 * 7, // 7 dienos
        },
    },
} as const;

export type CookieValues = {
    [COOKIES.CONSENT.name]: string;
    [COOKIES.TEST_RESULT.name]: typeof COOKIES.TEST_RESULT.values[keyof typeof COOKIES.TEST_RESULT.values] ;
};
