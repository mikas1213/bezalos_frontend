import { useEffect,useState } from 'react';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';

import { isAxiosError } from 'axios';

import { axiosPrivate } from '../../api/axios';
import type { AdminOutletContext } from '../../components/admin/layout/AdminLayout';

type Email = {
    id: string;
    email: string;
    created_at: string;
};

const MailsPage = () => {


    const [emails, setEmails] = useState<Email[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { stats } = useOutletContext<AdminOutletContext>();

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get<Email[]>('/admin/emails');
                setEmails(data);
                setIsLoading(false);
            } catch (err) {
                const message = isAxiosError<{ message?: string }>(err)
                    ? err.response?.data?.message || err.message
                    : String(err);
                toast.error(message);
            }
        };
        getData();

    }, []);
    return (
        <>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem'}}>
                {stats && Object.entries(stats.email_stats).map(([source, count]) => (<div key={source}>
                        <span>{source}</span>:&nbsp;
                        <span style={{ fontWeight: 'bold'}}>{count}</span>
                    </div>)
                )}
            </div>

            {!isLoading && emails.map(email => {
                return (<p key={email.id}>{email.email} {email.created_at.split('T').shift()}</p>);
            })}
        </>
    );
};

export default MailsPage;
