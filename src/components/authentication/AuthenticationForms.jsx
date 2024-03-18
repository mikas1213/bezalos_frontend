import  { useState, createContext, useMemo } from 'react';
import FormLeft from "./FormLeft";
import FormRight from "./FormRight";
import Signup from './signup/Signup';
import Login from './login/Login';
import ForgotPassword from "./forgot_password/ForgotPassword";

export const FormContext = createContext(null);

const Authentication = ({formState}) => {
    
    const [changeFormState, setChangeFormState] = useState(formState);
    const providerchangeFormState = useMemo(() => ({changeFormState, setChangeFormState}), [changeFormState, setChangeFormState]);

    
    return (
        <FormContext.Provider value={providerchangeFormState}>
            <FormLeft />
            <FormRight>
                {changeFormState === 'signin' && <Login />}
                {changeFormState === 'signup' && <Signup />}
                {changeFormState === 'forgot' && <ForgotPassword />}
            </FormRight>        
        </FormContext.Provider>
    );
};

export default Authentication;