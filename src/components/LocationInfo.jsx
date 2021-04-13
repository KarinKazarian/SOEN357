import { Modal, Box } from '@material-ui/core';
//import { styled } from '@material-ui/core/styles';
import useWindowSize from '../hooks/useWindowSize';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  RadialBar,
  PolarAngleAxis,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import { Input, Button, VStack, Center } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useState, useRef, useCallback } from 'react';

const LocationInfo = React.memo(
  ({ isOpen, onOpen, onClose, bestTimeData, onToggle }) => {
    const windowSize = useWindowSize();
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
    const data = [
      {
        name: '18-24',
        uv: 100,
        pv: 2400,
        fill: '#8884d8',
      },
    ];

    const StyledBox = styled(Box)`
      background: rgba(255, 255, 255, 0.25);
      box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.37);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      display: inline-block;
    `;

    return (
      <>
        <VStack spacing='24px'>
          <StyledBox>
            <Center>Live Traffic</Center>
            <ResponsiveContainer
              width={windowSize.width / 5}
              height={windowSize.height / 2.5}
            >
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
                  25%
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </StyledBox>

          <StyledBox width='100%' height='100%'>
            <Center>Busy Hours</Center>
            <BarChart
              width={windowSize.width / 5}
              height={windowSize.height / 3.5}
              data={bestTimeData}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign='top' />
              <Bar dataKey='pv' fill='#8070da' />
            </BarChart>
          </StyledBox>
          {/* </Collapse> */}
        </VStack>
      </>
    );
  }
);

export default LocationInfo;
