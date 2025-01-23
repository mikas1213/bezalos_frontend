import InformationSoon from '../../components/information_soon/InformationSoon';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useOutletContext } from 'react-router-dom';
import toast from 'react-hot-toast';

import StatistikaLayout from '../../components/profilis/statistika/StatistikaLayout';
import Container from '../../components/UI/Container';
import BodyTracking from '../../components/profilis/statistika/BodyTracking';
import Chart from '../../components/profilis/statistika/Chart';
import StatistikaData from '../../components/profilis/statistika/StatistikaData';
import Pagination from '../../components/UI/Pagination';

const getApimtys = data => {
    return ['bicepsas', 'talija', 'sedmenys', 'slaunis']
        .map(field => data[field]?.trim() || '')
        .filter(val => val !== '')
        .reduce((acc, val) => acc + Number(val), 0);
};

const StatistikaPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const { user_id, is_subscription } = useOutletContext();

    const [formData, setFormData] = useState({});
    const [chartData, setChartData] = useState([]);
    // const [bodyData, setBodyData] = useState([]);
    const [bodyStats, setBodyStats] = useState({});
    const [errors, setErrors] = useState([]);
    const [isLoadingChartData, setIsLoadingChartData] = useState(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const [timeFrame, setTimeFrame] = useState({frame: '3months', label: '3 mėnesiai', label_mob: '3 mėn'});

    /* PADINATION */
    const recordsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedRecords, setPaginatedRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data: { rows, stats, all_data } } = await axiosPrivate.get(`/profile/body-tracking/${user_id}?period=${timeFrame.frame}`);
                
                setChartData(rows);
                setBodyStats(stats);
                // setBodyData(all_data);
                setIsLoadingChartData(false);

                /* PADINATION */
                const total = Math.ceil(all_data.length / recordsPerPage);
                setTotalPages(total);
                            
                const indexOfLastRecord = currentPage * recordsPerPage;
                const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
                const currentRecords = all_data.slice(indexOfFirstRecord, indexOfLastRecord);
                setPaginatedRecords(currentRecords);
            } catch (err) {
                setIsLoadingChartData(false);
            }
        };
        getData();
    }, [axiosPrivate, user_id, timeFrame, currentPage]);
    
    const addBodyTracking = async () => {
        const sum = getApimtys(formData);
        
        try {
            setIsLoadingAdd(true);
            const {data: { row_id }} = await axiosPrivate.post(`/profile/body-tracking/${user_id}`, formData);
            
            setChartData(prevState => [...prevState.slice(1), {
                id: row_id, 
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
                trend_apimtys: bodyStats.last_apimtys ? sum - bodyStats.last_apimtys : 0
            } : {};

            
            // setBodyData(prevState => [{
            //     id: row_id,
            //     svoris: formData.svoris || 0,
            //     bicepsas: formData.bicepsas || 0,
            //     talija: formData.talija || 0,
            //     sedmenys: formData.sedmenys || 0,
            //     slaunis: formData.slaunis || 0,
            //     created_at: new Date().toLocaleString('lt-LT')
            // }, ...prevState]);
            // if(currentPage === 1) {
            
            setPaginatedRecords(prevState => [{
                id: row_id,
                svoris: formData.svoris || 0,
                bicepsas: formData.bicepsas || 0,
                talija: formData.talija || 0,
                sedmenys: formData.sedmenys || 0,
                slaunis: formData.slaunis || 0,
                created_at: new Date().toLocaleString('lt-LT')
            }, ...prevState]);
            // }
            setCurrentPage(1);
            setBodyStats(prevState => ({ ...prevState, ...svorisData, ...apimtysData }));
            setIsLoadingAdd(false);
            setFormData({});
            toast.success('Duomenys pateikti')
        } catch (err) {
            
            setErrors(err.response.data.errors); 
            setIsLoadingAdd(false);
        }
    }

    const deleteBodyData = async (id) => {
        try {
            const {data: { stats }} = await axiosPrivate.delete(`/profile/body-tracking/${id}`);
            setChartData(prevState => prevState.filter(row => row.id !== id));
            // setBodyData(prevState => prevState.filter(row => row.id !== id));
            setPaginatedRecords(prevState => prevState.filter(row => row.id !== id));
            setBodyStats(stats);
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
        {is_subscription ? <Container>
            {is_subscription && !isLoadingChartData && <StatistikaLayout>
                <BodyTracking 
                    formData={formData} 
                    setFormData={setFormData} 
                    errors={errors}
                    setErrors={setErrors}
                    isLoadingAdd={isLoadingAdd}
                    addBodyTracking={addBodyTracking}
                />
                <Chart 
                    chartData={chartData} 
                    bodyStats={bodyStats} 
                    timeFrame={timeFrame}
                    setTimeFrame={setTimeFrame}
                />
                
            </StatistikaLayout>}        
            {paginatedRecords.length > 0 && <StatistikaData 
                deleteBodyData={deleteBodyData}
                currentPage={currentPage}
                totalPages={totalPages}
                paginatedRecords={paginatedRecords}
                setPaginatedRecords={setPaginatedRecords}
                setCurrentPage={setCurrentPage}
            />}
            {totalPages > 1 && <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} pagesLimit={5} />}
        </Container>
        : 
        <Container>
            <InformationSoon />
        </Container>}
        </>
    );
};

export default StatistikaPage;