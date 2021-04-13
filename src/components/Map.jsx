import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
//import { Box } from '@material-ui/core';
import { useDisclosure, HStack, Box, Link } from '@chakra-ui/react';
import LocationInfo from './LocationInfo';
// import { makePostRequest } from '../utils/api/besttime';
import { FaWarehouse } from 'react-icons/fa';

const Map = React.memo(() => {
  const testData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const hq = {
    longitude: -73.745181,
    latitude: 45.4644455,
  };

  const accessToken =
    'pk.eyJ1Ijoia2FyaW4ta2F6YXJpYW4iLCJhIjoiY2tteWVjMnFpMDM4MTJubWYycTJ5N3Q5ZCJ9.Of9brpnQ8Oc-LGZ6P1ArrA';
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 45.4644455,
    longitude: -73.745181,
    zoom: 8,
  });
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen, onToggle } = useDisclosure();

  // const [bestTimesDataString, setBestTimesDataString] = useState('');
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };
      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const apiTest = async () => {
    // const response = await makePostRequest({
    //   api_key_private:"pri_7b5f18965b7d46a5b708eeee58fc2354",
    //   venue_address: locationAddress,
    //   venue_name: locationName
    // });
    // let bestTimesData = response?.data?.analysis?.[0]?.quiet_hours;
    // let bestTimesDataString = JSON.stringify(bestTimesData);
    // console.log('Quiet Hours: ', bestTimesDataString);
    // console.log('json response: ', response);
    // console.log('json quiet hours: ', response?.data?.analysis?.[0]?.quiet_hours);
    // setBestTimesDataString('[6,20,21,22,23,0]');
    //onToggle();
    console.log("hello");
  };
  const test2 = useRef('');
  //  const locationName = test2?.current?.cachedResult?.place_name.slice(0, test2?.current?.cachedResult?.place_name.indexOf(','));
  //  const locationAddress = test2?.current?.cachedResult?.place_name.substring(test2?.current?.cachedResult?.place_name.indexOf(",")+1);
  //  console.log("Location:", locationName);
  //  console.log("Location Address:", locationAddress);

  const mystyle = {
    height: 50,
    background: 'black',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 4,
    position: 'absolute',
  };

  return (
    <>
      <HStack spacing='2px' position='relative'>
        <Box alignSelf='baseline' w='30%' resize='horizontal' overflow='auto'>
          <div
            ref={geocoderContainerRef}
            style={{
              height: 50,

              display: 'flex',
              alignItems: 'center',
              paddingLeft: 4,
            }}
          />
          <LocationInfo
            isOpen={isOpen}
            // onOpen={onOpen}
            // onClose={onClose}
            onToggle={onToggle}
            bestTimeData={testData}
          />
        </Box>
        {/* <Box h='1000px' w='100%' position='absolute'> */}

        <Box w='90%'>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            position='absolute'
            top={0}
            bottom={0}
            width='100%'
            mapboxApiAccessToken={accessToken}
            mapStyle='mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1'
            onViewportChange={handleViewportChange}
            onTransitionEnd={apiTest}
          >
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              ref={test2}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={accessToken}
              width='100%'
              position='top-left'
              marker={false}
              onResult={apiTest}
            />
            <Link
              onClick={() => {
                onToggle();
                console.log('dead');
              }}
            >
              <Marker
                longitude={hq.longitude}
                latitude={hq.latitude}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <FaWarehouse />
              </Marker>
            </Link>
          </ReactMapGL>
        </Box>
      </HStack>
    </>
  );
});

export default Map;
