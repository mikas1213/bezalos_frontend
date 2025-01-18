import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

import StatistikaLayout from '../../components/profilis/statistika/StatistikaLayout';
import Container from '../../components/UI/Container';
import BodyTracking from '../../components/profilis/statistika/BodyTracking';
import Chart from '../../components/profilis/statistika/Chart';
import StatistikaData from '../../components/profilis/statistika/StatistikaData';

const StatistikaPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user_id } = useOutletContext();

    const [formData, setFormData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [bodyStats, setBodyStats] = useState({});
    const [bodyData, setBodyData] = useState([]);
    const [errors, setErrors] = useState([]);
    const [isLoadingChartData, setIsLoadingChartData] = useState(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const [timeFrame, setTimeFrame] = useState({frame: '3months', label: '3 mėnesiai', label_mob: '3 mėn'});

    const addBodyTracking = async () => {
        
        const targetFields = ['bicepsas', 'talija', 'sedmenys', 'slaunis'];
        const sum = targetFields
        .map(field => formData[field]?.trim() || '')
        .filter(val => val !== '')
        .reduce((acc, val) => acc + Number(val), 0);

        try {
            setIsLoadingAdd(true);
            await axiosPrivate.post(`/profile/body-tracking/${user_id}`, formData);
            setChartData(prevState => [...prevState.slice(1), {
                svoris: formData.svoris ? +formData.svoris : null, 
                apimtys: sum > 0 ? sum : null,
                w_week_start: new Date().toLocaleString('lt-LT'), 
            }]);

            const svorisData = formData.svoris?.trim() ? {
                last_svoris: bodyStats.last_svoris || +formData.svoris,
                latest_svoris: +formData.svoris,
                trend_svoris: bodyStats.last_svoris ? +formData.svoris - bodyStats.last_svoris : 0
            } : {};

            const apimtysData = sum > 0 ? {
                last_apimtys: bodyStats.last_apimtys || sum,
                latest_apimtys: sum,
                trend_apimtys: bodyStats.last_apimtys ?   sum - bodyStats.last_apimtys : 0
            } : {};

            setBodyStats(prevState => ({ ...prevState, ...svorisData, ...apimtysData }));

            setIsLoadingAdd(false);
            setFormData({});
            toast.success('Duomenys pateikti')
        } catch (err) {
            
            setErrors(err.response.data.errors); 
            setIsLoadingAdd(false);
        }
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { data: { rows, stats, all_data } } = await axiosPrivate.get(`/profile/body-tracking/${user_id}?period=${timeFrame.frame}`);
                
                setChartData(rows);
                setBodyStats(stats);
                setBodyData(all_data);
                setIsLoadingChartData(false);
            } catch (err) {
                setIsLoadingChartData(false);
            }
        };
        getData();
    }, [axiosPrivate, user_id, timeFrame]);

    return (
        <Container>
            <StatistikaLayout>
                <BodyTracking 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors}
                    setErrors={setErrors}
                    isLoadingAdd={isLoadingAdd}
                    addBodyTracking={addBodyTracking}
                />
                {!isLoadingChartData && <Chart 
                    chartData={chartData} 
                    bodyStats={bodyStats} 
                    timeFrame={timeFrame}
                    setTimeFrame={setTimeFrame}
                />}
            </StatistikaLayout>        
            {!isLoadingChartData && bodyData.length > 0 && <StatistikaData bodyData={bodyData} />}
        </Container>
        
    );
};

export default StatistikaPage;