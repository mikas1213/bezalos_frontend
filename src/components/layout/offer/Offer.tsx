import styles from './Offer.module.css';
import image from '../../../assets/images/offer/nieko-nevalgau.webp';
import Overlay from './Overlay';
import OfferSent from './OfferSent';
import axios from '../../../api/axios';
import { AxiosError } from 'axios';
import Spinner from '../../UI/Spinner';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import type { OfferProps, OfferInputData, ServerErrorResponse } from './types';

export const Offer = ({ setIsMounted, setIsOfferSent, isOfferSent, setCookie }: OfferProps) => {

    const handleSentOffer = () => {
        setIsMounted(s => !s);
        setIsOfferSent(false);

        setCookie('COOKIE_OFFER', true, {
            path: '/'
        });
    };

    const { register, formState: { errors }, setError, handleSubmit } = useForm<OfferInputData>({ mode: 'onChange' });
    const { mutate, isPending } = useMutation<void, AxiosError<ServerErrorResponse>, OfferInputData>({
        mutationFn: async (inputsData) => {
            await axios.post('mailer/send-offer', inputsData, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        },
        onSuccess: () => {
            setCookie('COOKIE_OFFER', true, {path: '/'});
            setIsOfferSent(sent => !sent);
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

    const onSubmit = ({ email }: { email: string }) => {
        mutate({
            email: email.toLowerCase().trim(),
        });
    };

    return (
        <Overlay handleSentOffer={ handleSentOffer }>
            {isPending && <Spinner /> }
            {isOfferSent ? 
                <OfferSent /> : 
                <>
                    <div className={styles.top}>
                        <img src={image} alt='avatar' />
                    </div>

                    <div className={styles.bottom}>

                        <div className={styles.offerContainer}>
                            <h1>DOVANA 🎁</h1>
                            <p>Įrašyk savo el. paštą ir NEMOKAMAI gauk įrašo ištrauką &quot;Nieko nevalgau, o svoris auga&quot;</p>
                        </div>

                        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                type='email' 
                                placeholder='el. paštas'
                                {...register('email')} 
                                autoComplete='off' 
                            />
                            {errors.email && <span className={styles.inputError}>{errors?.email?.message as string}</span>}    
                            <button>IŠPAKUOTI DOVANĄ</button>
                        </form>

                    </div>
                </>
            }
        </Overlay>
    );
};