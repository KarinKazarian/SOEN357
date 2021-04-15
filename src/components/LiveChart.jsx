import useWindowSize from '../hooks/useWindowSize';
import {
  RadialBar,
  PolarAngleAxis,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

const LiveChart = ({ data }) => {
  const windowSize = useWindowSize();
  return (
    <>
      <ResponsiveContainer width='100%' height='100%' aspect={1.5}>
        <RadialBarChart
          // width={windowSize.width}
          // height={windowSize.height}
          cx='50%'
          cy='50%'
          innerRadius={windowSize.width / 12}
          outerRadius={windowSize.width / 5}
          barSize={3}
          data={data}
          startAngle={230}
          endAngle={-50}
        >
          <PolarAngleAxis
            type='number'
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            clockWise
            dataKey='uv'
            cornerRadius={windowSize.width / 8}
            fill='#82ca9d'
          />
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            className='progress-label'
          >
            {data.value}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LiveChart;
