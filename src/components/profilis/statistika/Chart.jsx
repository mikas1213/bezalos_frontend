import styles from './Chart.module.css';
import CountUp from 'react-countup';
import { useState, useEffect, useRef } from 'react';
import { Weight, Ruler, ChevronDown, ChevronUp, Minus} from 'lucide-react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import Filters from '../../../components/profilis/statistika/Filters';
import FiltersMob from './FiltersMob';

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

    const prevValue = useRef(0);
    const prevTrend = useRef(0);
    useEffect(() => {
        prevValue.current = value;
        prevTrend.current = Math.abs(trend);
    }, [value, trend]);
    
    return (
        <div className={`${styles.container} ${styles[name]}`}>
            <div className={styles.label}>
                {name === 'Svoris' && <Weight className={styles.icon} />}
                {name === 'Apimtys' && <Ruler className={styles.icon} />}
                <span>{name}</span>
            </div>

            <div className={styles.value}>
                <CountUp
                    key={value}  
                    start={prevValue.current}
                    end={value}
                    decimals={2}
                    duration={1}
                    separator=''
                />
                <small className={styles.unit}>{unit}</small>
            </div>

            <div className={styles.summary}>
                <div className={`${styles.value} ${styles[trend_class]}`}>
                    {trend_class === 'decreased' && <ChevronDown className={styles.chevronIcon} />}
                    {trend_class === 'increased' && <ChevronUp className={styles.chevronIcon} />}
                    {trend_class === 'unchanged' && <Minus className={styles.chevronIcon} />}
                    
                    <CountUp
                        key={Math.abs(trend)}  
                        start={prevTrend.current}
                        end={Math.abs(trend)}
                        decimals={1}
                        duration={1.5}
                        separator=''
                    />
                    <small>{unit}</small>
                </div>
                <span className={styles.change}>{trend_label}</span>
            </div>                                            
        </div>
    );
}

const Chart = ({ chartData, bodyStats, timeFrame, setTimeFrame }) => {
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
                <StatisctiItem name='Svoris' value={bodyStats.latest_svoris} trend={bodyStats.trend_svoris} unit='kg' />
                <StatisctiItem name='Apimtys' value={bodyStats.latest_apimtys} trend={bodyStats.trend_apimtys} unit='cm' />
                <Filters timeFrame={timeFrame} setTimeFrame={setTimeFrame} />    
            </div>
            <FiltersMob timeFrame={timeFrame} setTimeFrame={setTimeFrame}/>

            <ResponsiveContainer width='100%' height={300}>
                <ComposedChart 
                    data={chartData}
                    className={styles.test}
                    margin={{ right: isMobile ? 0 : 10, left: isMobile ? -10 : 0, bottom: 2 }}
                >
                    <CartesianGrid stroke='#e0e0e0' vertical={false} />
                    <XAxis 
                        tick={{ fontSize: 11, dy: 5, fill: 'var(--grey-dark)' }} 
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
                        domain={domain_calc(chartData, 'svoris')}
                        tick={{ fontSize: 11, fill: 'var(--grey-dark)' }} 
                        tickLine={false} 
                        axisLine={{ stroke: '#ddd', strokeWidth: 0 }}
                        tickFormatter={value => value ? `${value} kg` : Math.round(value)}
                    />
                    <YAxis 
                        yAxisId='right'
                        dataKey='apimtys'
                        orientation='right'
                        domain={domain_calc(chartData, 'apimtys')}
                        tick={{ fontSize: 11, fill: 'var(--grey-dark)' }} 
                        tickLine={false} 
                        axisLine={{ stroke: '#ddd', strokeWidth: 0 }}
                        tickFormatter={value => value ? `${value} cm` : Math.round(value)}
                    />
                    <Tooltip 
                        contentStyle={{
                            fontSize: 'var(--font-size-small-1)',
                            border: '1px solid #ddd',
                            borderRadius: '0.5rem',
                            padding: '0.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                        labelStyle={{
                            color: 'var(--color-text-grey)',
                            margin: 0
                        }}
                        itemStyle={{
                            fontWeight: 600,
                            padding: '0'
                        }}
                        formatter={(value, name) => [`${name === 'svoris' ? `${value} kg` : `${value} cm`}`]}
                        labelFormatter={(value, props) => {
                            return new Date(Date.parse(props[0]?.payload?.created_at || props[0]?.payload?.w_week_start))?.toLocaleDateString('lt-LT', {year: 'numeric', month: 'long', day: 'numeric'})
                            
                        }}
                    />

                    <Line 
                        yAxisId='left'
                        type='monotone'
                        dataKey='svoris'
                        connectNulls={true}
                        stroke='var(--color-bgr-bottom)'
                        animationDuration={400}
                        strokeWidth={isMobile ? 3 : 2} 
                        dot={(props) => {
                            const { cx, cy, key, index, payload } = props;
                            if(!payload.svoris) return null;
                            return (
                                <g key={key}>
                                    <circle cx={cx} cy={cy} r={index === 0 ? 0 : isMobile ? 3.5 : 3} fill='var(--color-bgr-bottom)' />
                                </g>
                            );
                        }}
                        activeDot={{ stroke: 'var(--color-bgr-top)', strokeWidth: 2, fill: 'white', r: 3 }}
                    />
                    <Line 
                        yAxisId='right' 
                        type='monotone'
                        dataKey='apimtys'
                        connectNulls={true}
                        stroke='var(--color-btn-secondary)'
                        animationDuration={700}
                        strokeWidth={isMobile ? 3 : 2} 
                        dot={(props) => {
                            const { cx, cy, key, index, payload } = props;
                            if(!payload.apimtys) return null;
                            return (
                                <g key={key}>
                                    <circle cx={cx} cy={cy} r={index === 0 ? 0 : isMobile ? 3.5 : 3} fill='var(--color-btn-secondary)' />
                                </g>
                            );
                        }}
                        activeDot={{ stroke: 'var(--color-btn-secondary)', strokeWidth: 2, fill: 'white', r: 3 }}
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

export default Chart;