import { Box } from '@material-ui/core';
import { VStack, Center, Link, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import LiveChart from './LiveChart';
import BusyHoursChart from './BusyHoursChart';

const StyledBox = styled(Box)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: inline-block;
`;

const LocationInfo = ({ liveData, buynessData }) => {
  const liveDataArray = [{ live: liveData, fill: '#8884d8' }];
  const [buynessDataArray, setBuynessDataArray] = useState([]);

  useEffect(() => {
    if (buynessData != null && buynessData.length !== 0) {
      const temp = [];
      buynessData.map((day) => {
        temp[day.day_info.day_int] = day.day_raw;
      });
      setBuynessDataArray(temp);
    }
  }, [buynessData]);

  return (
    <>
      <VStack spacing='18px' height='50%'>
        <StyledBox width='100%'>
          <Center>Live Traffic</Center>
          <LiveChart data={liveDataArray} />
        </StyledBox>

        <StyledBox width='100%' paddingBottom='20px' paddingRight='15px'>
          <Center>Busy Hours</Center>
          <BusyHoursChart data={buynessDataArray} />
        </StyledBox>
        <Box>
          <Text fontSize='xs'>
            Data Taken From: <Link>https://besttime.app/</Link>
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default LocationInfo;
