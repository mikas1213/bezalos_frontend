import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import { useLogin } from '../hooks/useLogin';
import toast from 'react-hot-toast';
import type { ReactNode } from 'react';
import type { AuthenticationContextValue, FormData, AuthActions, AuthMode, InitialTarget } from './types';

export const AuthenticationProvider = ({ children }: { children : ReactNode}) => {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        passwordConfirmed: "",
        initialTarget: "abu",
        acceptTerms: false,
    });

    const [authMode, setAuthMode] = useState<AuthMode>("login");

    const authActions: Record<AuthMode, AuthActions> = {
        login:  {
            title: "Sveiki sugrįžę",
            subTitle: "Prisijunkite prie savo paskyros",
            btnLabel: "Prisijungti",
            authCta: "Neturite paskyros?",
            authCtaBtn: "Registruotis",
            authAction: "signup",
        },
        signup: {
            title: "Pradėkime",
            subTitle: "Užpildykite registracijos formą",
            btnLabel: "Tęsti",
            authCta: "Jau turite paskytą?",
            authCtaBtn: "Prisijungti",
            authAction: "login",
        },
        initialTarget: {
            title: `Sveiki, ${formData.name.split(" ")[0] || "Vartotojau"}`,
            subTitle: "Koks jūsų pagrindinis tikslas?",
            btnLabel: "Registruotis",
            authCta: "Jau turi paskyrą?",
            authCtaBtn: "Prisijungti",
            authAction: "login",
        },
        forgot: {
            title: "Pamiršote slaptažodį?",
            subTitle: "Įveskite savo el. pašto adresą ir mes atsiųsime nuorodą slaptažodžiui atkurti",
            btnLabel: "Siųsti nuorodą",
            authCta: "Grįžti į",
            authCtaBtn: "Prisijungimą",
            authAction: "login",
        },
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        console.log('type: ', type)
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTargetSelect = (targetId: InitialTarget): void => {
        setFormData((prev) => ({ ...prev, initialTarget: targetId }));
    };

    // const loginMutation = useLogin();
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     switch(authMode) {
    //         case "login":
    //             console.log('authMode: ', authMode);
    //             loginMutation.mutate({
    //                 email: formData.email,
    //                 password: formData.password,
    //             },
    //             {
    //                 onSuccess: () => {
    //                     console.log("viskas good");
    //                       toast.success("Prisijungimas sėkmingas!");
    //                     // toast.success('Reservation created successfully!', TOAST_STYLE);
    //                     // handleCloseModal();
    //                 },
    //                 onError: (error: AxiosError<{ message: string }>) => {
    //                     console.log("niekas negud", error)
    //                     // const err: string =
    //                     //     error.response?.status === 409
    //                     //     ? error.response?.data.message
    //                     //     : 'An error occurred while updating the reservation.';
    //                     // setError(err);
    //                 },
    //             });
    //             return;
    //         case "forgot":
    //             console.log('authMode: ', authMode);
    //             return;
    //         case "signup":
    //             console.log('authMode: ', authMode);
    //             setFormData(prev => ({ ...prev, acceptTerms: false }));
    //             setAuthMode("initialTarget")
    //             return;
    //         case "initialTarget":
    //             console.log('authMode: ', authMode);
    //             return;
    //     }
    // };

    const value: AuthenticationContextValue = {
        authMode,
        authActions,
        formData,
        setFormData,
        handleChange,
        setAuthMode,
        handleTargetSelect,
    }

    return (
        <AuthenticationContext.Provider value={value}>
            { children }
        </AuthenticationContext.Provider>
    );
};
