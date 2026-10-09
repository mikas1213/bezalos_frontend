import { useEffect,useState } from 'react';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import styles from './Circle.module.css';

const Circle = ({ plan }) => {
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
        { id: 'b', value: +plan.b, color: '#245D6B' },
        { id: 'a', value: +plan.a, color: '#30c040' },
        { id: 'r', value: +plan.r, color: '#ec9f11' },
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
                        animationBegin={100}
                        animationDuration={800}
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
                        {plan.kcal}
                        <tspan >kcal</tspan>
                    </text>

                    <text x={'50%'} y={'50%'} dy={circle.dy} className={styles.bar} 
                        textAnchor='middle' 
                    >
                        <tspan fill='var(--color-b)'>B {plan.b}</tspan>
                        <tspan dx={circle.bar_space} fill='var(--color-a)'>A {plan.a}</tspan>
                        <tspan dx={circle.bar_space} fill='var(--color-r)'>R {plan.r}</tspan>
                    </text>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Circle;