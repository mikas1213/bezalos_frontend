import { createContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
type AuthData = {
    accessToken?: string
};
type AuthContextType = {
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState({});

    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isOpenModal, setIsOpenModal }}>
            {children}
        </AuthContext.Provider>
    )
}