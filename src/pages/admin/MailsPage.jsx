import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const MailsPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await axiosPrivate.get('/admin/offers');
                setOffers(data.data.offers);
                setIsLoading(false);
            } catch (err) {
                console.log(err.message);
            }
        };
        getData();
    }, [axiosPrivate]);
    return (
        <>
            <span>Total: {offers.length}</span>
            {!isLoading && offers.map(offer => {
                return (<p key={offer.id}>{offer.email} {offer.created_at.split('T').shift()}</p>);
            })}
        </>
    );
};

export default MailsPage;