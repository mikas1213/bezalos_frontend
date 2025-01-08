import styles from './Chart.module.css';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts';
const data = [
    {
      "name": "Page A",
      "uv": 400,
      "pv": 240,
      "amt": 240
    },
    {
      "name": "Page B",
      "uv": 300,
      "pv": 139,
      "amt": 221
    },
    {
      "name": "Page C",
      "uv": 200,
      "pv": 980,
      "amt": 229
    },
    {
      "name": "Page D",
      "uv": 278,
      "pv": 390,
      "amt": 200
    },
    {
      "name": "Page E",
      "uv": 189,
      "pv": 480,
      "amt": 218
    },
    {
      "name": "Page F",
      "uv": 239,
      "pv": 380,
      "amt": 250
    },
    {
      "name": "Page G",
      "uv": 349,
      "pv": 430,
      "amt": 210
    },
    {
        "name": "Page H",
        "uv": 349,
        "pv": 430,
        "amt": 210
      }
]

  
const Chart = () => {
    return (
        <div className={styles.chart}>
            {/* <ResponsiveContainer width={700} height="50%"> */}
            <AreaChart 
                width={620} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-btn-primary)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-btn-primary)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-bgr-top)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="var(--color-bgr-top)" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey="name" 
                    axisLine={true}
                    // axisLine={{ stroke: '#d4d', strokeWidth: 2 }}
                    tickLine={true}
                    tick={{ fontSize: 10 }} 
                />
                <YAxis 
                    tick={{ fontSize: 10 }} 
                    domain={[0, dataMax => Math.ceil(dataMax * 1.15)]} 
                />
                <CartesianGrid 
                    strokeDasharray='3 3' 
                    stroke="#e0e0e0"
                />
                {/* <CartesianGrid strokeDasharray="3 3" verticalCoordinatesGenerator={(props) => props.width > 450 ? [150, 300, 450] : [200, 400]} /> */}
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="var(--color-btn-primary)" fillOpacity={1} fill="url(#colorUv)" />
                <Area 
                    type="monotone" 
                    dataKey="pv" 
                    strokeWidth='2'
                    stroke="var(--color-bgr-top)" 
                    fillOpacity={1} 
                    fill="url(#colorPv)" 
                    // dot={{ stroke: 'var(--color-bgr-top)', strokeWidth: 2, fill: 'white', r: 4 }}
                    dot={(props) => {
                        console.log('props: ', props)
                        const { cx, cy, value, key } = props;
                        // const isHighestValue = value === Math.max(...data.map(item => item.pv));
                        return (
                            <g key={key}>
                                <circle 
                                    cx={cx} 
                                    cy={cy} 
                                    r={4} 
                                    stroke="var(--color-bgr-top)" 
                                    strokeWidth={2} 
                                    fill="white" 
                                />
                                <text 
                                    x={cx} 
                                    y={cy - 10} 
                                    textAnchor="middle" 
                                    fill="var(--color-text-green-dark)"
                                    fontSize="12"
                                >
                                    {value[1]}
                                </text>
                            </g>
                        );
                    }}
                    // activeDot={{ stroke: 'var(--color-bgr-top)', strokeWidth: 2, fill: 'white', r: 6 }}
                    label={{
                        position: 'top',
                        fill: 'var(--color-bgr-bottom)',
                        fontSize: 12,
                        content: (props) => `${props.value}`
                    }}
                />
            </AreaChart>
            {/* </ResponsiveContainer> */}
        </div>
    );
};

export default Chart;