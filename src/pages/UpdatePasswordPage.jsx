import UpdatePassword from '../components/auth/UpdatePassword';
import ResetTokenError from '../components/auth/ResetTokenError';

import axios from '../api/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../components/UI/Spinner';

const UpdatePasswordPage = () => {
    const { token } = useParams();
    const {isLoading, data } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                return await axios.get(`/auth/reset-password/${token}`);
            } catch(err) {
                return err?.response?.data
            }
        }
    });

    console.log('UpdatePasswordPage', data)
    if(isLoading) return <Spinner />;
    return (
        <>
            {
                data?.data?.email ? <UpdatePassword /> : <ResetTokenError />
            }
        </>
    );
};

export default UpdatePasswordPage;
