import styles from './Signup.module.css';
import axios from '../../api/axios';

import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { PiUserCirclePlusDuotone } from 'react-icons/pi';
import { FaUser, FaLock } from 'react-icons/fa6';
import { FaEnvelope } from 'react-icons/fa';
import { RiEyeCloseLine } from 'react-icons/ri';
import { BsEyeFill } from 'react-icons/bs';

import { FormStateContext } from './Authentication';


import Spinner from '../UI/Spinner';

const Signup = () => {
    const [eyeOne, setEyeOne] = useState(false);
    const [eyeTwo, setEyeTwo] = useState(false);
    const [radioData, setRadioData] = useState('abu');
    const { setFormState } = useContext(FormStateContext);

    const { register, formState: { errors }, getValues, setError, watch, handleSubmit } = useForm({ mode: 'onChange' });
    
    const { mutate, isPending } = useMutation({
        mutationFn: async (inputsData) => {
            await axios.post('auth/signup', inputsData, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        },
        onSuccess: () => {
            setFormState('success');
        },
        onError: (err) => {
            const { response: {data: {errors: serverErrors}} } = err;

            const { path, msg } = serverErrors[0]
            setError(path, { type: "server", message: msg });
        }
    });
    
    const submit = ({name, email, password, passwordConfirmed}) => {
        mutate({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            initial_target: radioData,
            password: password.trim(),
            passwordConfirmed: passwordConfirmed.trim()
        });
    };
    
    return (
        <div className={styles.right}>
            {isPending && <Spinner />}
            <form className={styles.signup} onSubmit={handleSubmit(submit)}>
                <div className={styles.header}>
                    <PiUserCirclePlusDuotone className={styles.icon} />
                </div>

                <div className={styles.inputs}>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input type='text'
                                placeholder='Vardas'
                                className={`${errors.name && styles.invalid || !!watch('name') && !errors.name && styles.valid}`} 
                                {...register('name', {
                                required: 'Neįvestas vardas',
                                maxLength: {
                                    value: 24,
                                    message: 'Vardas yra per ilgas'
                                },
                                validate: value => {
                                    if(/[^a-zA-Z0-9_ -]+/.test(value)) {
                                        return 'Galimi simboliai: (_-)'
                                    } 
                                }
                            })} autoComplete='off' />
                            <FaUser className={styles.icon}/>
                        </div>
                        {errors.name && <span className={styles.inputError}>{errors?.name?.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input type='email' 
                                placeholder='El. paštas'
                                className={`${errors.email && styles.invalid || !!watch('email') && !errors.email && styles.valid}`} 
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
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input type={eyeOne ? 'text' : 'password'}
                                placeholder='Slaptažodis'
                                className={`${errors.password && styles.invalid || !!watch('password') && !errors.password && styles.valid}`}
                                {...register('password', {
                                required: 'Neįvestas slaptažodis',
                                validate: value => {
                                    if(!/[a-z]+/i.test(value)) {
                                        return 'Slaptažodį turi sudaryti bent viena raidė'
                                    } else if(!/[0-9]+/.test(value)) {
                                        return 'Slaptažodį turi sudaryti bent vienas skaičius'
                                    } else if(value.length < 8) {
                                        return 'Slaptažodis turi būti ne trumpesnis nei 8 simboliai'
                                    }
                                }
                            })} autoComplete='off' />
                            <FaLock className={styles.icon}/>
                            <div className={styles.eyeIconContainer} onClick={() => setEyeOne((on) => !on)}>
                                {eyeOne ? 
                                    (<BsEyeFill className={styles.eyeIcon} />) : 
                                    (<RiEyeCloseLine className={styles.eyeIcon} 
                                />)}
                            </div>
                        </div>
                        {errors.password && <span className={styles.inputError}>{errors?.password?.message}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.inputContainer}>
                            <input type={eyeTwo ? 'text' : 'password'} 
                                placeholder='Pakartokite slaptažodį'
                                className={`${errors.passwordConfirmed && styles.invalid || !!watch('passwordConfirmed') && !errors.passwordConfirmed && styles.valid}`}
                                {...register('passwordConfirmed', {
                                required: 'Pakartokite slaptažodį',
                                validate: value => value === getValues().password || 'Slaptažodis nesutampa'
                            })} autoComplete='off' />
                            <FaLock className={styles.icon}/>
                            <div className={styles.eyeIconContainer} onClick={() => setEyeTwo((on) => !on)}>
                                {eyeTwo ? 
                                    (<BsEyeFill className={styles.eyeIcon} />) : 
                                    (<RiEyeCloseLine className={styles.eyeIcon} 
                                />)}
                            </div>
                        </div>
                        {errors.passwordConfirmed && <span className={styles.inputError}>{errors?.passwordConfirmed?.message}</span>}
                    </div>
                    
                </div>

                <div className={styles.maneDomina}>
                    <h3>Mane domina: </h3>
                </div>

                <div className={styles.radios}>
                    <div className={styles.radio}>
                        <input 
                            {...register('initial_target')}
                            className={styles.input} 
                            type='radio'
                            checked={radioData === 'profilis'}
                            value='profilis'
                        />
                        <span className={styles.check} onClick={() => setRadioData('profilis')}></span>
                        <label onClick={() => setRadioData('profilis')}>Sveikas svorio metimas</label>
                    </div>

                    <div className={styles.radio}>
                        <input 
                            {...register('initial_target')}
                            className={styles.input} 
                            type='radio'
                            checked={radioData === 'virtuve'}
                            value='virtuve'
                        />
                        <span className={styles.check} onClick={() => setRadioData('virtuve')}></span>
                        <label onClick={() => setRadioData('virtuve')}>Išmokti sveikatai palankios mitybos pagrindų</label>
                    </div>

                    <div className={styles.radio}>
                        <input 
                            {...register('initial_target')}
                            className={styles.input} 
                            type='radio'
                            checked={radioData === 'abu'}
                            value='abu'
                        />
                        <span className={styles.check} onClick={() => setRadioData('abu')}></span>
                        <label onClick={() => setRadioData('abu')}>Abu aukščiau pateikti variantai</label>
                    </div>

                    <div className={styles.radio}>
                        <input 
                            {...register('initial_target')}
                            className={styles.input} 
                            type='radio'
                            checked={radioData === 'nezinau'}
                            value='nezinau'
                        />
                        <span className={styles.check} onClick={() => setRadioData('nezinau')}></span>
                        <label onClick={() => setRadioData('nezinau')}>Dar nežinau</label>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <button disabled={isPending ? true : false}>{isPending ? 'PALAUKITE...': 'REGISTRUOTIS'}</button>
                </div>

                <div className={styles.signInMobile} onClick={() => setFormState('signin')}>
                    <span>Jau turi paskyrą?</span>
                    <span>Prisijungti</span>
                </div>
            </form>
        </div>
    );
};

export default Signup;
