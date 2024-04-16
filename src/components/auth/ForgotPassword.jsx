import styles from './ForgotPassword.module.css';
// import SignatureImg from '../../assets/images/homepage/signature.png';
import axios from '../../api/axios';
import Spinner from '../UI/Spinner';

import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { FormStateContext } from "./Authentication";

import { PiKeyholeDuotone } from 'react-icons/pi';
import { FaEnvelope } from 'react-icons/fa';

const ForgotPassword = () => {
    const { setFormState } = useContext(FormStateContext);
    const { register, formState: { errors }, setError, watch, handleSubmit } = useForm({ mode: 'onChange'});
    
    const { mutate, isPending } = useMutation({
        mutationFn: async ({ email }) => {
            return await axios.post('/auth/forgot-password', { email },
                {
                    header: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            )
        },
        onSuccess: () => {
            setFormState('token-sent');
        },
        onError: (err) => {
            const { response: {data: {errors: serverErrors}} } = err;
            const { type, msg } = serverErrors[0];
            setError('email', { type, message: msg });
        }
    });

    const submit = ({ email }) => mutate({ 
        email: email.toLowerCase().trim()
    });
    
    return (
        <div className={styles.right}>
            {isPending && <Spinner />}
            <form className={styles.forgot} onSubmit={handleSubmit(submit)}>
                <div className={styles.header}>
                    <PiKeyholeDuotone className={styles.icon}/>
                </div>

                <div className={styles.inputs}>
                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input type='email' 
                                placeholder='El. paštas'
                                className={`${(errors.email) && styles.invalid || !!watch('email') && !errors.email && styles.valid}`} 
                                {...register('email', {
                                required: 'Neįvestas el. paštas',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Neteisingai įvestas el. pašto adresas'
                                }
                            })} autoComplete='off' />
                            <FaEnvelope className={styles.icon}/>
                        </div>
                        {errors.email && <span className={styles.inputError}>{errors?.email?.message}</span>}

                        <div className={styles.prisijungti}>
                            <p onClick={() => setFormState('signin')}>Prisijungti</p>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <button disabled={isPending ? true : false}>{isPending ? 'PALAUKITE...' : 'PRIMINTI'}</button>
                </div>             
            </form>

            {/* <div className={styles.signatureContainer}>
                <img src={SignatureImg} alt='logo' />             
            </div> */}
        </div>
    );
};

export default ForgotPassword;
