import styles from './Offer.module.css';
import avatar from '../../assets/images/offer/offer.webp';
import Overlay from './Overlay';
import OfferSent from './OfferSent';
import axios from '../../api/axios/';
import Spinner from '../UI/Spinner';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

const Offer = ({ setIsShowOffer, setIsOfferSent, isOfferSent, setCookie }) => {

    const handleSentOffer = () => {
        setIsShowOffer(s => !s);
        setIsOfferSent(false);
        // var today = new Date();
        // today.setSeconds(today.getSeconds() + 10);

        setCookie('COOKIE_OFFER', true, {
            path: '/', 
            // expires: today
        });
    };

    const { register, formState: { errors }, setError, handleSubmit } = useForm({ mode: 'onChange' });
    const { mutate, isPending } = useMutation({
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
            const { response: {data: {errors: serverErrors}} } = err;
            const { path, msg } = serverErrors[0]
            setError(path, { type: 'server', message: msg });
        }
    });
    const onSubmit = ({ email }) => {
        mutate({
            email: email.toLowerCase().trim(),
        });
    };
    
    return (
        <Overlay handleSentOffer={ handleSentOffer }>
            {isPending && <Spinner /> }
            {isOfferSent ? <OfferSent /> : <div className={styles.offerContent}>  
                    <div className={styles.imgContainer}>
                        <img src={avatar} alt='avatar' />
                    </div>

                    <div className={styles.textContainer}>
                        <h1>DOVANA 🎁</h1>
                        <p>
                            Įrašyk savo el. paštą ir NEMOKAMAI gauk vieną žiūrimiausių Be žalos | Virtuvės merginų įrašą&nbsp;<br />
                            <span>&quot;Fizinis ir emocinis alkis&quot;</span> 
                        </p>
                    </div>
                    <form className={styles.formGroup} onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            type='email' 
                            placeholder='el. paštas'
                            {...register('email')} 
                            autoComplete='off' 
                        />
                        {errors.email && <span className={styles.inputError}>{errors?.email?.message}</span>}    
                        <button>IŠPAKUOTI DOVANĄ</button>
                    </form>
            </div>}
        </Overlay>
    );
};

export default Offer;