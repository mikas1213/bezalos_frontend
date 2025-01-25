import styles from './No_Chart.module.css';
import { useState, useEffect } from 'react';
import { Weight, Ruler, ChevronDown, ChevronUp, ChevronLeft, Minus} from 'lucide-react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Filters from '../../../../components/profilis/statistika/Filters';
import FiltersMob from '../FiltersMob';

const testData = [
    {
        "id": null,
        "svoris": null,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": null,
        "w_week_start": "2024-10-27T22:00:00.000Z",
        "ud_week_start": null,
        "week": "44"
    },
    {
        "id": null,
        "svoris": null,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": null,
        "w_week_start": "2024-11-03T22:00:00.000Z",
        "ud_week_start": null,
        "week": "45"
    },
    {
        "id": null,
        "svoris": null,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": null,
        "w_week_start": "2024-11-10T22:00:00.000Z",
        "ud_week_start": null,
        "week": "46"
    },
    {
        "id": "5269ca48-e757-4c8c-928d-d6fe9af95812",
        "svoris": 96.7,
        "bicepsas": 41.3,
        "talija": 60.1,
        "sedmenys": 107.4,
        "slaunis": 46.7,
        "apimtys": 255.5,
        "created_at": "2024-11-24T10:46:00.000Z",
        "w_week_start": "2024-11-17T22:00:00.000Z",
        "ud_week_start": "2024-11-17T22:00:00.000Z",
        "week": "47"
    },
    {
        "id": "e292017f-7be1-4a97-bc85-a8d7fd0fe166",
        "svoris": 72.5,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": "2024-11-26T10:46:00.000Z",
        "w_week_start": "2024-11-24T22:00:00.000Z",
        "ud_week_start": "2024-11-24T22:00:00.000Z",
        "week": "48"
    },
    {
        "id": "f3f3f1d6-588e-4829-b9f0-71d469b0c42a",
        "svoris": 63.4,
        "bicepsas": 44.2,
        "talija": 68,
        "sedmenys": 101.5,
        "slaunis": 57.3,
        "apimtys": 271,
        "created_at": "2024-12-08T10:46:00.000Z",
        "w_week_start": "2024-12-01T22:00:00.000Z",
        "ud_week_start": "2024-12-01T22:00:00.000Z",
        "week": "49"
    },
    {
        "id": "921f6b3d-41f1-4271-8f80-e7665fb5908f",
        "svoris": null,
        "bicepsas": 39.9,
        "talija": 82.5,
        "sedmenys": 100.4,
        "slaunis": 45.5,
        "apimtys": 268.3,
        "created_at": "2024-12-09T10:46:00.000Z",
        "w_week_start": "2024-12-08T22:00:00.000Z",
        "ud_week_start": "2024-12-08T22:00:00.000Z",
        "week": "50"
    },
    {
        "id": null,
        "svoris": null,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": null,
        "w_week_start": "2024-12-15T22:00:00.000Z",
        "ud_week_start": null,
        "week": "51"
    },
    {
        "id": null,
        "svoris": null,
        "bicepsas": null,
        "talija": null,
        "sedmenys": null,
        "slaunis": null,
        "apimtys": null,
        "created_at": null,
        "w_week_start": "2024-12-22T22:00:00.000Z",
        "ud_week_start": null,
        "week": "52"
    },
    {
        "id": "3a29dea7-50e9-42db-a8e5-71227c13717a",
        "svoris": 63,
        "bicepsas": 43.3,
        "talija": 85.6,
        "sedmenys": 85.2,
        "slaunis": 60,
        "apimtys": 274.1,
        "created_at": "2024-12-31T10:46:00.000Z",
        "w_week_start": "2024-12-29T22:00:00.000Z",
        "ud_week_start": "2024-12-29T22:00:00.000Z",
        "week": "1"
    },
    {
        "id": "f6ed3344-4f7a-4690-a412-1588b00879c9",
        "svoris": 97.1,
        "bicepsas": 29.6,
        "talija": 65.3,
        "sedmenys": 105.1,
        "slaunis": 55.9,
        "apimtys": 255.9,
        "created_at": "2025-01-09T10:46:00.000Z",
        "w_week_start": "2025-01-05T22:00:00.000Z",
        "ud_week_start": "2025-01-05T22:00:00.000Z",
        "week": "2"
    },
    {
        "id": "02c81edb-2f64-4d78-b0ab-a5cb91a9dfaa",
        "svoris": 74.6,
        "bicepsas": 28.1,
        "talija": 72,
        "sedmenys": 116.3,
        "slaunis": 67.8,
        "apimtys": 284.2,
        "created_at": "2025-01-13T10:46:00.000Z",
        "w_week_start": "2025-01-12T22:00:00.000Z",
        "ud_week_start": "2025-01-12T22:00:00.000Z",
        "week": "3"
    }
];

const timeFrames = [
    {frame: '1month', label: '1 mėnesis', label_mob: '1 mėn.'},
    {frame: '3months', label: '3 mėnesiai', label_mob: '3 mėn.'},
    {frame: '6months', label: '6 mėnesiai', label_mob: '6 mėn.'},
    {frame: '1year', label: '1 metai', label_mob: '12 mėn.'},
    {frame: 'alltime', label: 'Visa trukmė', label_mob: 'Viskas'}
];

const domain_calc = (data, key, top = 1, bottom = 1) => {
    const validValues = data.filter(item => item[key] !== null).map(item => item[key]);    
    const minValue = Math.min(...validValues);
    const maxValue = Math.max(...validValues);
    
    const middlePoint = (minValue + maxValue) / 2;
    const totalRange = maxValue - minValue;

    const domainMin = Math.round(middlePoint - (totalRange * bottom)) <= 0 ? 0 : Math.round(middlePoint - (totalRange * bottom));
    const domainMax = Math.round(middlePoint + (totalRange * top));
    
    return [domainMin, domainMax]
};

const StatisctiItem = ({ name, value, trend, unit }) => {
    const trend_label = trend < 0 ? 'sumažėjo' : trend > 0 ? 'padidėjo' : 'nepakito';
    const trend_class = trend < 0 ? 'decreased' : trend > 0 ? 'increased' : 'unchanged';
    
    return (
        <div className={`${styles.container} ${styles[name]}`}>
            <div className={styles.label}>
                {name === 'Svoris' && <Weight className={styles.icon} />}
                {name === 'Apimtys' && <Ruler className={styles.icon} />}
                <span>{name}</span>
            </div>

            <div className={styles.value}>
                <span>{value}</span>
                <small className={styles.unit}>{unit}</small>
            </div>

            <div className={styles.summary}>
                <div className={`${styles.value} ${styles[trend_class]}`}>
                    {trend_class === 'decreased' && <ChevronDown className={styles.chevronIcon} />}
                    {trend_class === 'increased' && <ChevronUp className={styles.chevronIcon} />}
                    {trend_class === 'unchanged' && <Minus className={styles.chevronIcon} />}

                    <span>{Math.abs(trend)}</span>
                    <small>{unit}</small>
                </div>
                <span className={styles.change}>{trend_label}</span>
            </div>                                            
        </div>
    );
}

const No_Chart = () => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 440px)');
        const applyMediaQuery = () => {
            if (mediaQuery.matches) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        mediaQuery.addEventListener('change', applyMediaQuery);
        applyMediaQuery();

        return () => {
            mediaQuery.removeEventListener('change', applyMediaQuery);
        };      
    }, []);

    return (
        <div className={styles.chart}>

            <div className={styles.chartHeader}>
                <StatisctiItem name='Svoris' value='64.4' trend='-4.4' unit='kg' />
                <StatisctiItem name='Apimtys' value='245.5' trend='-35.7' unit='cm' />
                
                <div className={styles.filters}>
                    <div className={`${styles.timeFrame}`} >
                        <span className={styles.label_desktop}>3 mėnesiai</span>
                        <span className={styles.label_mob}>3 mėn</span>
                        <ChevronLeft className={styles.selectIcon} />
                    </div>
                </div>
            </div>
            <div className={styles.filtersMob}>
                {timeFrames.map(option => <span 
                    key={option.frame}
                    className={`${styles.option} ${option.label === '3 mėnesiai' ? styles.active : ''}`}
                    >{option.label_mob}
                </span>)}
            </div>

            <ResponsiveContainer width='100%' height={300}>
                <ComposedChart 
                    data={testData}
                    className={styles.test}
                    margin={{ right: isMobile ? 0 : 10, left: isMobile ? -10 : 0, bottom: 2, top: 5 }}
                >
                    <CartesianGrid stroke='#eee' vertical={false} />
                    <XAxis 
                        tick={{ fontSize: 11, dy: 5, fill: '#ddd' }} 
                        interval='preserveStartEnd'
                        tickLine={false} 
                        textAnchor='middle'
                        tickMargin={10}
                        axisLine={{ stroke: '#ddd', strokeWidth: 1 }}
                        dataKey={val => {
                            let date = new Date(Date.parse(val.created_at || val.w_week_start)).toLocaleDateString('lt-LT', {month: 'short', day: 'numeric'}).replace('-', '.');
                            return date;
                        }}
                    />
                    <YAxis 
                        yAxisId='left'
                        dataKey='svoris'
                        orientation='left'
                        domain={domain_calc(testData, 'svoris')}
                        tick={{ fontSize: 11, fill: '#ddd' }} 
                        tickLine={false} 
                        axisLine={{ strokeWidth: 0 }}
                        tickFormatter={value => value ? `${value} kg` : Math.round(value)}
                    />
                    <YAxis 
                        yAxisId='right'
                        dataKey='apimtys'
                        orientation='right'
                        domain={domain_calc(testData, 'apimtys')}
                        tick={{ fontSize: 11, fill: '#ddd' }} 
                        tickLine={false} 
                        axisLine={{ strokeWidth: 0 }}
                        tickFormatter={value => value ? `${value} cm` : Math.round(value)}
                    />

                    <Line 
                        yAxisId='left'
                        type='monotone'
                        dataKey='svoris'
                        connectNulls={true}
                        stroke='#1B1B1B55'
                        animationDuration={400}
                        strokeWidth={isMobile ? 3 : 2} 
                        isAnimationActive={false}
                        dot={(props) => {
                            const { cx, cy, key, index, payload } = props;
                            if(!payload.svoris) return null;
                            return (
                                <g key={key}>
                                    <circle cx={cx} cy={cy} r={index === 0 ? 0 : isMobile ? 3.5 : 3} fill='#bbb' />
                                </g>
                            );
                        }}
                    />
                    <Line 
                        yAxisId='right' 
                        type='monotone'
                        dataKey='apimtys'
                        connectNulls={true}
                        stroke='#75757555'
                        animationDuration={700}
                        strokeWidth={isMobile ? 3 : 2} 
                        isAnimationActive={false}
                        dot={(props) => {
                            const { cx, cy, key, index, payload } = props;
                            if(!payload.apimtys) return null;
                            return (
                                <g key={key}>
                                    <circle cx={cx} cy={cy} r={index === 0 ? 0 : isMobile ? 3.5 : 3} fill='#ddd' />
                                </g>
                            );
                        }}
                    />
                </ComposedChart>
            </ResponsiveContainer>

            <div className={styles.recomendations}>
                <span className={styles.svarbu}>🚨 Svarbu!</span>
                <span>• Svorį gali vesti ne dažniau kaip kartą per savaitę</span>
                <span>• Apimtis <u>rekomenduojama</u> vesti ne dažniau kaip kas dvi savaites</span>
            </div>
        </div>
    );
};

export default No_Chart;