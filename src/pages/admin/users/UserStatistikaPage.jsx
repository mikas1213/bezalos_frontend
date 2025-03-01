import { useOutletContext } from "react-router-dom";
import Header from '../../../components/admin/user/statistics/Header';
import StatisticLayout from '../../../components/admin/user/statistics/StatisticLayout';
import Card from '../../../components/admin/user/statistics/Card';
import { Weight, Ruler } from 'lucide-react';

const styles = { display: 'flex' };

const UserStatistikaPage = () => {
    const { isLoading, user } = useOutletContext();
    const [apimtys] = user.apimtys;

    return (
        <div style={styles}>
            {isLoading ? null : apimtys ?  
                <StatisticLayout>
                    <Header apimtys={apimtys} /> 
                    <Card 
                        className='weight' 
                        icon={<Weight />} 
                        label='SVORIO POKYTIS' 
                        diff={apimtys.svoris_diff}
                        newest={apimtys.svoris_newest}
                        oldest={apimtys.svoris_oldest}
                        unit='kg'
                    />
                    <Card 
                        className='body' 
                        icon={<Ruler />} 
                        label='APIMČIŲ POKYTIS' 
                        diff={apimtys.apimtys_sum_diff}
                        newest={apimtys.apimtys_sum_newest}
                        oldest={apimtys.apimtys_sum_oldest}
                        unit='cm'
                        talija={apimtys}
                    />
                </StatisticLayout>
                : <div>Statistikos nėra</div>}
        </div>
    );
};

export default UserStatistikaPage; 