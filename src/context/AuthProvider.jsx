import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, isOpenModal, setIsOpenModal }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;