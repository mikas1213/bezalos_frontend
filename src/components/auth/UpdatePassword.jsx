import styles from './UpdatePassword.module.css';
import axios from '../../api/axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import FlexContainer from '../UI/FlexContainer';
import FormInput from '../UI/FormInput';

const UpdatePassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const type_password = 'password';
    const type_passwordConfirmed = 'passwordConfirmed';
    const [openEye, setOpenEye] = useState(false);

    const {
        register,
        formState: { errors },
        getValues,
        setError,
        watch,
        handleSubmit,
    } = useForm({ mode: "onChange" });

    const { mutate, isPending } = useMutation({
        mutationFn: async (inputsData) => {
            await axios.patch(`auth/reset-password/${token}`, inputsData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
        },
        onSuccess: () => {
            toast.success('Slaptažodis pakeistas sėkmingai!');
            navigate('/prisijungti');
        },
        onError: (err) => {
            console.log('errors: ', err)
            const {
                response: {
                    data: { errors: serverErrors },
                },
            } = err;

            const { path, msg } = serverErrors[0];
            setError(path, { type: "server", message: msg });
        },
    });

    const submit = ({ password, passwordConfirmed }) => {
        mutate({
            password: password.trim(),
            passwordConfirmed: passwordConfirmed.trim()
        });
    };
   
    return (
        <FlexContainer className={styles.bgr}>
            <div className={styles.updateContainer}>
                <h1>ATKURTI SLAPTAŽODĮ</h1>
                <p>
                    Slaptažodį turėtų sudaryti ne mažiau nei 8 simboliai iš
                    kurių bent vienas skaičius, dėl saugumo siūlome nenaudoti to
                    paties slaptažodžio kaip kitose registracijose
                </p>
                <form onSubmit={handleSubmit(submit)}>
                    <FormInput
                        errors={errors}
                        openEye={openEye}
                        setOpenEye={setOpenEye}
                        inputType={type_password}
                    >
                        <input
                            type={openEye ? "text" : "password"}
                            placeholder="Slaptažodis"
                            className={`${
                                (errors.password && styles.invalid) ||
                                (!!watch(type_password) &&
                                    !errors[type_password] &&
                                    styles.valid)
                            }`}
                            {...register(type_password, {
                                required: "Neįvestas slaptažodis",
                                validate: (value) => {
                                    if (!/[a-z]+/i.test(value)) {
                                        return "Slaptažodį turi sudaryti bent viena raidė";
                                    } else if (!/[0-9]+/.test(value)) {
                                        return "Slaptažodį turi sudaryti bent vienas skaičius";
                                    } else if (value.length < 8) {
                                        return "Slaptažodis turi būti ne trumpesnis nei 8 simboliai";
                                    }
                                },
                            })}
                            autoComplete="off"
                        />
                    </FormInput>

                    <FormInput
                        errors={errors}
                        openEye={openEye}
                        setOpenEye={setOpenEye}
                        inputType={type_passwordConfirmed}
                    >
                        <input
                            type={openEye ? "text" : "password"}
                            placeholder="Pakartokite slaptažodį"
                            className={`${
                                (errors.passwordConfirmed && styles.invalid) ||
                                (!!watch(type_passwordConfirmed) &&
                                    !errors[type_passwordConfirmed] &&
                                    styles.valid)
                            }`}
                            {...register("passwordConfirmed", {
                                required: "Pakartokite slaptažodį",
                                validate: (value) =>
                                    value === getValues().password ||
                                    "Slaptažodis nesutampa",
                            })}
                            autoComplete="off"
                        />
                    </FormInput>

                    <div className={styles.bottom}>
                        <button disabled={isPending ? true : false}>
                            {isPending ? "PALAUKITE..." : "ATKURTI"}
                        </button>
                    </div>
                </form>
            </div>
        </FlexContainer>
    );
};

export default UpdatePassword;
