import InformationSoon from '../../components/information_soon/InformationSoon';
import Container from '../../components/UI/Container';
import StatistikaLayout from '../../components/profilis/statistika/StatistikaLayout';
import BodyTracking from '../../components/profilis/statistika/BodyTracking';
import Chart from '../../components/profilis/statistika/Chart';
import { useState } from 'react';

const StatistikaPage = () => {
    const [formData, setFormData] = useState({});

    return (
        <InformationSoon />
        // <Container>
        //     <StatistikaLayout>
        //         <BodyTracking formData={formData} setFormData={setFormData} />
        //         <Chart />
        //     </StatistikaLayout>            
        // </Container>
        
    );
};

export default StatistikaPage;