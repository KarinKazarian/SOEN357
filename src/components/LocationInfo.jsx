import { Modal, Box } from '@material-ui/core';
//import { styled } from '@material-ui/core/styles';
import useWindowSize from '../hooks/useWindowSize';
import { VStack, Center } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import LiveChart from './LiveChart';
import BusyHoursChart from './BusyHoursChart';

const LocationInfo = ({ bestTimeData, liveData }) => {
  console.log('live: ', liveData);
  const data = [{ uv: liveData, fill: '#8884d8' }];
  const [barChartData, setBarChartData] = useState([]);

  const StyledBox = styled(Box)`
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: inline-block;
  `;

  useEffect(() => {
    console.log('bestTiem data: ', bestTimeData);
    if (bestTimeData != null && bestTimeData.length !== 0) {
      let data = [];
      for (let i = 0; i < 24; i++) {
        data.push({ hour: i, busyness: bestTimeData[i] });
      }
      setBarChartData(data);
    }
  }, [bestTimeData]);

  return (
    <>
      <VStack spacing='24px'>
        <StyledBox width='100%' height='100%'>
          <Center>Live Traffic</Center>
          <LiveChart data={data} />
        </StyledBox>

        <StyledBox width='100%' height='100%' paddingBottom='20px'>
          <Center>Busy Hours</Center>
          <BusyHoursChart data={barChartData} />
        </StyledBox>
      </VStack>
    </>
  );
};

export default LocationInfo;
