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
import React, { useState, useEffect } from 'react';

const LocationInfo = ({ bestTimeData, liveData }) => {
  const windowSize = useWindowSize();
  console.log('live: ', liveData);
  const data = [{ uv: liveData, fill: '#8884d8' }];

  const StyledBox = styled(Box)`
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: inline-block;
  `;

  const [barChartData, setBarChartData] = useState([]);

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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label} : ${payload[0].value}`}</p>
          <p className='intro'>{'getIntroOfPage(label)'}</p>
          <p className='desc'>Anything you want can be displayed here.</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <VStack spacing='24px'>
        <StyledBox width='100%' height='100%'>
          <Center>Live Traffic</Center>
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
                {liveData.value}%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </StyledBox>

        <StyledBox width='100%' height='100%'>
          <Center>Busy Hours</Center>
          <ResponsiveContainer width='100%' height='100%' aspect={2}>
            <BarChart width={500} height={400} data={barChartData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='hour'
                label={{
                  value: 'hour',
                  position: 'insideBottomRight',
                  offset: 0,
                }}
              />
              <YAxis
                label={{
                  value: 'Percentage %',
                  angle: -90,
                  position: 'insideRightTop',
                }}
              />
              <Tooltip />
              <Legend verticalAlign='top' />
              <Bar dataKey='busyness' fill='#8070da' />
            </BarChart>
          </ResponsiveContainer>
        </StyledBox>
      </VStack>
    </>
  );
};

export default LocationInfo;
