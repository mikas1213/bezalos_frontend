import { useForm, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { axiosPublic } from '../../../../api/axios';
import { Box, Cluster } from '../../../Shared';

import styles from './NewsLetter.module.css';

type NewsLetterFormData = {
    email: string
};

export type ServerErrorResponse = {
    errors: Array<{
        path: string;
        msg: string;
    }>;
};

export const NewsLetter = () => {
    const { register, formState: { errors }, setError, control, reset, handleSubmit } = useForm<NewsLetterFormData>({ mode: 'onChange' });
    const email = useWatch({ control, name: 'email' });
    const { mutate, isPending } = useMutation<void, AxiosError<ServerErrorResponse>, NewsLetterFormData>({
        mutationFn: async (inputsData) => {
            await axiosPublic.post('mailer/add', inputsData, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        },
        onSuccess: () => {
            toast.success('Ačiū! 💚');
            reset();
        },
        onError: (err) => {
             if (err.response?.data?.errors) {
                const { response: {data: {errors: serverErrors}} } = err;
                const { path, msg } = serverErrors[0];
                if (path === 'email') {
                    setError(path, { type: 'server', message: msg });
                } else {
                    setError('root', { type: 'server', message: msg });
                }
             }
        }
    });

    const submit = ({ email }: NewsLetterFormData) => {
        mutate({
            email: email.toLowerCase().trim(),
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <Cluster justify='center' className={styles.footerEmail}>
                <Box className={styles.emailWrapper}>
                    <input type='email'
                        placeholder='El. paštas'
                        className={`${errors.email && styles.invalid || !!email && !errors.email && styles.valid}`}
                            {...register('email', {
                                required: 'Neįvestas el. paštas',
                                pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Neteisingai įvestas el. pašto adresas'
                            }
                    })} autoComplete='off' />
                    <button type="submit" disabled={isPending ? true : false}>Prenumeruoti</button>
                    {errors.email && <span className={styles.inputError}>{errors?.email?.message}</span>}
                </Box>
            </Cluster>
        </form>
    );
};
