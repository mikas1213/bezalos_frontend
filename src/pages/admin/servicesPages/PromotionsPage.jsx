import { useOutletContext } from 'react-router-dom';
import { useAxiosPrivate } from '../../../features/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Promo, { PromoHeader } from '../../../components/admin/services/Promo';
import toast from 'react-hot-toast';

const layoutStyles = {
    display: 'grid', 
    rowGap: '0.5rem', 
    marginTop: '0.5rem', 
    borderRadius: '0.5rem'
};

const PromotionsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();


    const handlePromoDelete = useMutation({
        mutationFn: id => axiosPrivate.delete(`/admin/promo/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin-promo'] })
        },
        onError: err => {
            toast.error(err.message || 'Klaida!');
        }
    });

    const { promotions, isLoadingPromo } = useOutletContext();

    return (
        <div style={layoutStyles}>
            <PromoHeader />
            {isLoadingPromo ? null : promotions ? promotions.map(promo => <Promo key={promo.id} promo={promo} handlePromoDelete={handlePromoDelete} />) : null}
        </div>
    );
};

export default PromotionsPage;