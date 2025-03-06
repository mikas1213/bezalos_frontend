import { useOutletContext } from "react-router-dom";
import Header from '../../../components/admin/user/statistics/Header';
import StatisticLayout from '../../../components/admin/user/statistics/StatisticLayout';
import Card from '../../../components/admin/user/statistics/Card';
import CardBody from '../../../components/admin/user/statistics/CardBody';
import CardProportions from '../../../components/admin/user/statistics/CardProportions';

const styles = { display: 'flex' };
const UserStatistikaPage = () => {
    const { isLoading, user } = useOutletContext();
    const {name, email} = user;
    const apimtys = { ...user.apimtys[0] };
    const apimtysArr = ['SVORIS', 'APIMČIŲ SUMA', 'APIMTYS'];
    const isSumFake = apimtys?.apimtys_newest_has_nulls || apimtys?.apimtys_oldest_has_nulls;
     
    console.log(apimtys)
    const proportions = {
        bicepsas: 'Bicepsas',
        talija: 'Talija',
        sedmenys: 'Sėdmenys',
        slaunis: 'Šlaunis'
    }
    return (
        <div style={styles}>
            {!isLoading && 
                <StatisticLayout>
                    <Header apimtys={apimtys} name={name} email={email} /> 
                    {apimtysArr.map(label => <Card key={label} label={label} isSumFake={isSumFake}>
                        {label === 'SVORIS' && <CardBody 
                            diff={apimtys.svoris_diff}
                            unit='kg'
                            newest={apimtys.svoris_newest}
                            oldest={apimtys.svoris_oldest}
                        />}

                        {label === 'APIMČIŲ SUMA' && <CardBody 
                            diff={apimtys.apimtys_diff}
                            unit='cm'
                            newest={apimtys.apimtys_newest}
                            oldest={apimtys.apimtys_oldest}
                        />}

                        {label === 'APIMTYS' &&
                            Object.entries(proportions).map(([key, label]) => <CardProportions 
                                key={key}
                                newest={apimtys[`${key}_newest`]}
                                diff={apimtys[`${key}_diff`]}
                                label={label}
                            />)
                        }
                    </Card>)}
                </StatisticLayout>}
        </div>
    );
};

export default UserStatistikaPage; 