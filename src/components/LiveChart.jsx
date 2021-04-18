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
      <ResponsiveContainer width='70%' height='auto' aspect={1.5}>
        <RadialBarChart
          cx='70%'
          cy='50%'
          innerRadius='90%'
          outerRadius='100%'
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
            dataKey='live'
            cornerRadius={windowSize.width / 8}
            fill='#82ca9d'
          />
          <text
            x='70%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            className='progress-label'
          >
            {data[0].live}%
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
};

export default LiveChart;
