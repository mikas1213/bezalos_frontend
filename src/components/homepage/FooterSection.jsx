import styles from './FooterSection.module.css';
import MainContainer from './ui/MainContainer';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icons/svg/be-zalos-logo.svg';

import axios from '../../api/axios/';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { PiFacebookLogo, PiInstagramLogo, PiAt } from 'react-icons/pi';

const FooterSection = () => {

    const { register, formState: { errors }, setError, watch, reset, handleSubmit } = useForm({ mode: 'onChange' });
    
    const { mutate, isPending } = useMutation({
        mutationFn: async (inputsData) => {
            await axios.post('mailer/add', inputsData, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
        },
        onSuccess: () => {
            toast.success('Ačiū! 💚');
            reset();
        },
        onError: (err) => {
            const { response: {data: {errors: serverErrors}} } = err;
            const { path, msg } = serverErrors[0]
            setError(path, { type: "server", message: msg });
        }
    });
    
    const submit = ({ email }) => {
        mutate({
            email: email.toLowerCase().trim(),
        });
    };


    
    return (
        <footer className={styles.footerSection}>
            <MainContainer customClass={styles.footerContainer}>
                <div className={styles.footerTitle}>
                    <span>Keliaujam į ilgalaikius&nbsp;</span> 
                    <span>pokyčius kartu?</span>
                </div>
                <div className={styles.footerText}>
                    <p>Gauk palaikymą ir mokslu grįstą informaciją, kaip pagaliau pasiekti ilgalaikių rezultatų su meile ir be žalos</p>
                </div>

                <form className={styles.newsletterEmail} onSubmit={handleSubmit(submit)}>
                    <div className={styles.footerEmail}>
                        <div>
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
                            <button disabled={isPending ? true : false}>Prenumeruoti</button>
                            {errors.email && <span className={styles.inputError}>{errors?.email?.message}</span>}    
                        </div>
                    </div>
                </form>

                <div className={styles.footerTop}>
                    <div className={styles.footerLogo}>
                        <img src={Logo} alt='logo' className={styles.logoIcon} onClick={() => window.scrollTo(0, 0)}/>
                    </div>
                    <div className={styles.termsOfUse}>
                        <Link to='/kontaktai'>Kontaktai</Link>
                        <Link to='/taisykles'>Taisyklės</Link>
                        <Link to='/privatumo-politika'>Privatumo politika</Link>
                    </div>
                    <div className={styles.socialIcons}>
                        <Link to='https://www.facebook.com/sandra.jatulyte' target='_blank'>
                            <PiFacebookLogo className={styles.icon}/>    
                        </Link>
                        <Link to='https://www.instagram.com/valgau_be_zalos' target='_blank'>
                            <PiInstagramLogo className={styles.icon} />
                        </Link>
                       
                        <Link to='mailto:sandra@valgaubezalos.lt'>
                            <PiAt className={styles.icon} />
                        </Link>
                    </div>
                </div>
                <div className={styles.footerDivider}></div>
                <div className={styles.footerBottom}>
                    <span className={styles.copy}>&copy;</span>
                    <span>2024 Valgau be žalos</span>
                </div>
            </MainContainer>
        </footer>
    );
};

export default FooterSection;
