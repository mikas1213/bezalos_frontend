import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import { useOutletContext } from 'react-router-dom';

const MailsPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const [emails, setEmails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { stats } = useOutletContext();
    console.log('stats: ', Object.entries(stats.email_stats))
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
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem'}}>
                {
                    Object.entries(stats.email_stats).map(([source, count]) => <div>
                        <span>{source}</span>:&nbsp;
                        <span style={{ fontWeight: 'bold'}}>{count}</span>
                    </div>
                )}
            </div>

            {!isLoading && emails.map(email => {
                return (<p key={email.id}>{email.email} {email.created_at.split('T').shift()}</p>);
            })}
        </>
    );
};

export default MailsPage;
