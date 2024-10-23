/*
    auto: The default value, which lets the browser choose the most appropriate baseline1
    use-script: Aligns the text according to the script of the first character.
    no-change: Keeps the current alignment without any changes.
    central: Centers the text vertically.
    middle: Aligns the text to the middle of the text's height.
    alphabetic: Aligns the text to the alphabetic baseline (the baseline used for most letters).
    hanging: Aligns the text to the hanging baseline (used for characters like "j" or "g").
    text-before-edge: Aligns the text to the top of the text's height.
    text-after-edge: Aligns the text to the bottom of the text's height.
*/
import styles from './Circle.module.css';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Circle = ({ plan }) => {

    const data = [
        { id: 'b', value: +plan.b, color: '#245D6B' },
        { id: 'a', value: +plan.a, color: '#30c040' },
        { id: 'r', value: +plan.r, color: '#ec9f11' },
    ];

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <ResponsiveContainer width={'100%'} height={290}>
                <PieChart width={'100%'} height={'100%'}> 
                    <Pie
                        data={data}
                        cx={'50%'}
                        cy={'50%'}
                        innerRadius={92}
                        outerRadius={105}
                        cornerRadius={10}
                        // fill='#8884d8'
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
                        dominantBaseline='no-change'
                    >
                        {plan.kcal}
                        <tspan style={{fontSize: '0.8rem'}}>kcal</tspan>
                    </text>

                    <text x={'35%'} y={'53%'}
                        className={styles.bar} 
                        dominantBaseline='text-before-edge' 
                        fill='var(--color-b)'
                    >
                        B {plan.b}
                    </text>
                    <text x={'46%'} y={'53%'} 
                        className={styles.bar} 
                        dominantBaseline='text-before-edge' 
                        fill='var(--color-a)'
                    >
                        A {plan.a}
                    </text>

                    <text x={'59%'} y={'53%'}
                        className={styles.bar} 
                        dominantBaseline='text-before-edge' 
                        fill='var(--color-r)'
                    >
                        R {plan.r}
                    </text>
                </PieChart>
                
            </ResponsiveContainer>
        </div>
    );
};

export default Circle;