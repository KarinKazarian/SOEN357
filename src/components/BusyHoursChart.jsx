import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';

const BusyHoursChart = ({ data }) => {
  return (
    <>
      <ResponsiveContainer width='100%' height='100%' aspect={2}>
        <BarChart width={500} height={400} data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='hour'
            label={{
              value: 'Hour',
              position: 'insideBottom',
              dy: 10,
            }}
          />
          <YAxis
            label={{
              value: 'Percentage %',
              angle: -90,
              position: 'insideRightTop',
              dx: -10,
            }}
          />

          <Tooltip />
          <Legend verticalAlign='top' />
          <Bar dataKey='busyness' fill='#8070da' />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default BusyHoursChart;
