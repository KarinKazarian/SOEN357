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
import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Center,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { weekDays } from '../constants';

const StyledFormLabel = styled(MenuItem)`
  &:hover {
    background-color: #bdb3f7;
  }
`;

const BusyHoursChart = ({ data }) => {
  const getToday = () => {
    const today = new Date().getDay();
    return today == 0 ? 6 : today - 1;
  };
  const [day, setDay] = useState(getToday);
  const [dataForChart, setDataForChart] = useState();

  useEffect(() => {
    if (data != null && data.length !== 0 && data[day] != null) {
      let temp = [];
      for (let i = 0; i < data[day].length; i++) {
        temp.push({ hour: i, busyness: data[day][i] });
      }
      setDataForChart(temp);
    } else {
      setDataForChart([]);
    }
  }, [day]);

  return (
    <>
      <Center height='50px'>
        <Divider />
        <Text fontSize='sm'>{weekDays[day]}</Text>

        <Divider />
        <Menu focusBorderColor='#8070da' placement='left' autoSelect={false}>
          <MenuButton
            as={Button}
            bg='#ffffff'
            _focus={{ bg: '#ffffff' }}
            _hover={{ bg: '#ffffff' }}
            _active={{ bg: '#ffffff' }}
            size='xs'
          >
            <ChevronDownIcon />
          </MenuButton>
          <MenuList>
            <StyledFormLabel onClick={() => setDay(0)}>
              {weekDays[0]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(1)}>
              {weekDays[1]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(2)}>
              {weekDays[2]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(3)}>
              {weekDays[3]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(4)}>
              {weekDays[4]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(5)}>
              {weekDays[5]}
            </StyledFormLabel>
            <StyledFormLabel onClick={() => setDay(6)}>
              {weekDays[6]}
            </StyledFormLabel>
          </MenuList>
        </Menu>
      </Center>
      <ResponsiveContainer
        width='100%'
        //style={{ height: `calc(100% -80px)` }}
        height='auto'
        aspect={2}
      >
        <BarChart width={500} height={400} data={dataForChart}>
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
              value: 'Percentage',
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
