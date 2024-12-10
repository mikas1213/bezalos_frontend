
import styles from './Circle.module.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

const Circle = () => {
    const [circle, setCircle] = useState({ inner: 92, outer: 105, bar_space: 15, dy: 22,  height: 290 });
    
    useEffect(() => {
        const adjustCircleProps = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 320) {
                setCircle({ inner: 68, outer: 78, bar_space: 8, dy: 18, height: 220 });
            } else if (screenWidth <= 375) {
                setCircle({ inner: 78, outer: 90, bar_space: 12, dy: 20, height: 260 });
            } else {
                setCircle({ inner: 92, outer: 105, bar_space: 15, dy: 22, height: 290 });
            }

        }

        // Run on initial load
        adjustCircleProps();

        // Attach listener for window resize
        window.addEventListener('resize', adjustCircleProps);

        // Cleanup on unmount
        return () => window.removeEventListener('resize', adjustCircleProps);
    }, []);


    const data = [
        { id: 'b', value: 15, color: '#4E4E4E77' },
        { id: 'a', value: 30, color: '#65656577' },
        { id: 'r', value: 25, color: '#89898977' },
    ];

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ResponsiveContainer width={'100%'} height={circle.height}>
                <PieChart width={'100%'} height={'100%'}> 
                    <Pie
                        data={data}
                        cx={'50%'}
                        cy={'50%'}
                        innerRadius={circle.inner}
                        outerRadius={circle.outer}
                        cornerRadius={10}
                        paddingAngle={5} 
                        dataKey='value'
                        isAnimationActive={false}
                    >
                        {data.map(bar => (
                            <Cell key={`cell-${bar.id}`} fill={bar.color} />
                        ))}
                    </Pie>
                    
                    <text 
                        x={'50%'} y={'50%'} 
                        className={styles.kcalNum}
                        textAnchor='middle' 
                    >
                        {0}
                        <tspan >kcal</tspan>
                    </text>

                    <text x={'50%'} y={'50%'} dy={circle.dy} className={styles.bar} 
                        textAnchor='middle' 
                    >
                        <tspan fill='#4E4E4E77'>B {0}</tspan>
                        <tspan dx={circle.bar_space} fill='#65656577'>A {0}</tspan>
                        <tspan dx={circle.bar_space} fill='#89898977'>R {0}</tspan>
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Circle;