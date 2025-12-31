import styles from './KnowMore.module.css';
import { Box, Cluster } from '../../../../../components/Shared';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from '../../../../../api/axios';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { COOKIES, type CookieValues } from '../../../../../constants/cookies';
import type { ServerErrorResponse } from '../../../../../components/layout/offer/types';
export type EmailInputData = {
    email: string;
    check: boolean;
};
type AnswerVariant = CookieValues[typeof COOKIES.TEST_RESULT.name];

export const KnowMore = ({ result }: { result: AnswerVariant }) => {
    const navigate = useNavigate();
    const [, setCookie] = useCookies<keyof CookieValues, CookieValues>([COOKIES.TEST_RESULT.name]);
    const { register, formState: { errors }, setError, handleSubmit } = useForm<EmailInputData>({ mode: 'onChange' });

    const { mutate } = useMutation<void, AxiosError<ServerErrorResponse>, EmailInputData>({
        mutationFn: async (inputsData) => {
            await axios.post('mailer/test-results', inputsData);
        },
        onSuccess: () => {
            setCookie(COOKIES.TEST_RESULT.name, result, COOKIES.TEST_RESULT.options);
            navigate('/atlik-testa/suzinok-daugiau');
        },
        onError: (err) => {
            if (err.response?.data?.errors) {
                const { response: {data: {errors: serverErrors}} } = err;
                const { path, msg } = serverErrors[0];

                if (path === 'email') {
                    setError(path, { type: 'server', message: msg });
                } else if(path === 'check') {
                    setError(path, { type: 'server', message: msg });
                } else {
                    setError('root', { type: 'server', message: msg });
                }
            }
        }
    });

    const onSubmit = ({ email, check }: EmailInputData) => {
        mutate({
            check,
            email: email.toLowerCase().trim(),
        });
    };

    return (
        <Cluster className={styles.knowMore}>

            <Box className={styles.emailSubmit} padding={['var(--s-40)']} borderRadius='16px'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className={styles.title}>Sužinokite daugiau apie savo rezultatus</h2>
                    <Cluster className={errors.email && styles.emailInputError}>
                    <input
                        type='email'
                        { ...register('email') }
                        autoComplete='off'
                        className={styles.emailInput}
                        placeholder='Jūsų el. paštas'
                    />
                    {errors.email && <span className={styles.error}>{errors?.email?.message as string}</span>}
                    </Cluster>
                    <Cluster className={errors.check && styles.checkInputError} dir='column' align='flex-start'>
                        <label>
                            <input
                                type='checkbox'
                                { ...register('check') }
                            />
                            <span>Sutinku gauti naujienlaiškius</span>
                        </label>
                        {errors.check && <span className={styles.error}>{errors?.check?.message as string}</span>}
                    </Cluster>
                    <button>Sužinoti daugiau</button>
                </form>
            </Box>
        </Cluster>
    );
};
