import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';

const MailsPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const [emails, setEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get('/admin/emails');
                setEmails(data);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
            }
        };
        getData();

    }, [axiosPrivate]);
    return (
        <>
            <span>Total: {emails.length}</span>
            {!isLoading && emails.map(email => {
                return (<p key={email.id}>{email.email} {email.created_at.split('T').shift()}</p>);
            })}
        </>
    );
};

export default MailsPage;
