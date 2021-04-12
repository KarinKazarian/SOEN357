import { Modal, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useWindowSize from '../hooks/useWindowSize';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const LocationInfo = ({ isOpen, onOpen, onClose, bestTimeData }) => {
  const windowSize = useWindowSize();

  const LocationModal = styled(Box)({
    width: 300,
    height: 300,
    background: 'white',
    outline: 'none',
    marginTop: '150px',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  });

  const hours = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
  ];

  return (
    // <Modal
    //   BackdropProps={{ invisible: true }}
    //   open={isOpen}
    //   disableAutoFocus={true}
    //   disableEnforceFocus
    //   onClose={onClose}
    // >
      <BarChart width={600} height={400} data={bestTimeData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      // <LocationModal autoFocus={false}>
      //   {bestTimeData.map((bestTime) => (
      //     <div>{bestTime.name}</div>
      //   ))}
      // </LocationModal>
    // </Modal>
  );
};

export default LocationInfo;
