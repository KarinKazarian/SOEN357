import { Box } from '@material-ui/core';
import {
  VStack,
  Center,
  Link,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import LiveChart from './LiveChart';
import BusyHoursChart from './BusyHoursChart';
import { IconButton } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

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
          <Popover placement='top-start'>
            <PopoverTrigger>
              <IconButton
                aria-label='info'
                icon={<InfoOutlineIcon />}
                bg='#ffffff'
                _focus={{ bg: '#ffffff' }}
                _hover={{ bg: '#ffffff' }}
                _active={{ bg: '#ffffff' }}
                size='xs'
              />
            </PopoverTrigger>
            <PopoverContent
              height='150px'
              overflow='auto'
              _focus={{ bg: '#ffffff' }}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Live Data Definition</PopoverHeader>
              <PopoverBody>
                Live busyness at the venue for current, based on the weekly
                forecast. Ranging from 0 to 200 percent. In most cases the live
                percentage will be 100% or lower. However if the value is above
                100% it means it is more busy than the highest forecasted peak
                of the week. E.g. 200% meaning it is two times more busy than
                the normal forecasted peak of the week.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </StyledBox>

        <StyledBox width='100%' paddingRight='15px'>
          <Center>Busy Hours</Center>
          <BusyHoursChart data={buynessDataArray} />
          <Popover placement='top-start'>
            <PopoverTrigger>
              <IconButton
                aria-label='info'
                icon={<InfoOutlineIcon />}
                bg='#ffffff'
                _focus={{ bg: '#ffffff' }}
                _hover={{ bg: '#ffffff' }}
                _active={{ bg: '#ffffff' }}
                size='xs'
              />
            </PopoverTrigger>
            <PopoverContent
              height='150px'
              overflow='auto'
              _focus={{ bg: '#ffffff' }}
            >
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Busy Hours Definition</PopoverHeader>
              <PopoverBody>
                Percentages are based on historical visits for the given hour,
                relative to the biggest peak of the week for this venue.
              </PopoverBody>
            </PopoverContent>
          </Popover>
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
