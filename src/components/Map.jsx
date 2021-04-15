import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
//import { Box } from '@material-ui/core';
import { useDisclosure, HStack, Box, useToast, Center } from '@chakra-ui/react';
import LocationInfo from './LocationInfo';
import { makePostRequest, makePostRequestLive } from '../utils/api/besttime';
import { FaWarehouse } from 'react-icons/fa';
import styled from '@emotion/styled';
import useWindowSize from '../hooks/useWindowSize';

const StyledBox = styled(Box)`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 20px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: inline-block;
`;

const Map = () => {
  const windowSize = useWindowSize();

  const hq = {
    longitude: -73.745181,
    latitude: 45.4644455,
  };

  const accessToken =
    'pk.eyJ1Ijoia2FyaW4ta2F6YXJpYW4iLCJhIjoiY2tteWVjMnFpMDM4MTJubWYycTJ5N3Q5ZCJ9.Of9brpnQ8Oc-LGZ6P1ArrA';

  const [viewport, setViewport] = useState({
    latitude: 45.4644455,
    longitude: -73.745181,
    zoom: 8,
  });

  const [liveData, setLiveData] = useState(20);
  const [bestTimesData, setBestTimesData] = useState('');
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
  const location = useRef('');
  const toast = useToast();

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
    const { locationName, locationAddress } = getParams();
    const today = new Date().getDay();
    const todayBestTimes = today == 0 ? 6 : today - 1;
    console.log(':today: ', todayBestTimes);
    // const response = await makePostRequest({
    //   api_key_private: 'pri_7b5f18965b7d46a5b708eeee58fc2354',
    //   venue_address: locationAddress,
    //   venue_name: locationName,
    // });
    // let bestTimesData = response?.data?.analysis?.[todayBestTimes]?.day_raw;
    // setBestTimesData(bestTimesData);

    // try {
    //   var liveResponse = await makePostRequestLive({
    //     api_key_private: 'pri_7b5f18965b7d46a5b708eeee58fc2354',
    //     venue_address: locationAddress,
    //     venue_name: locationName,
    //   });
    //   console.log('liveResponse: ', liveResponse);
    //   if (liveResponse.data.status !== 'Error') {
    //     liveResponse = liveResponse?.analysis?.venue_live_busyness;
    //     setLiveData(liveResponse);
    //   } else {
    //     throw liveResponse.data.message;
    //   }
    // } catch (err) {
    //   toast({
    //     title: 'Error',
    //     description: err.message,
    //     status: 'error',
    //     duration: 5000,
    //     isClosable: true,
    //   });
    // }
  };

  const getParams = () => {
    const locationName = location?.current?.cachedResult?.place_name.slice(
      0,
      location?.current?.cachedResult?.place_name.indexOf(',')
    );
    const locationAddress = location?.current?.cachedResult?.place_name.substring(
      location?.current?.cachedResult?.place_name.indexOf(',') + 1
    );
    return { locationName, locationAddress };
  };

  return (
    <>
      <HStack spacing='5px'>
        <StyledBox
          alignSelf='baseline'
          w='35%'
          resize='horizontal'
          overflow='auto'
          h={windowSize.height * 0.86}
        >
          <Center>
            <div
              ref={geocoderContainerRef}
              style={{
                height: 50,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 4,
              }}
            />
          </Center>
          <LocationInfo liveData={liveData} bestTimeData={bestTimesData} />
        </StyledBox>

        <Box w='90%' h={windowSize.height * 0.86}>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            height='100%'
            width='100%'
            mapboxApiAccessToken={accessToken}
            mapStyle='mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1'
            onViewportChange={handleViewportChange}
            onTransitionEnd={apiTest}
          >
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              ref={location}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={accessToken}
              // width='100%'
              // position='top-left'
              // marker={true}
              onResult={apiTest}
            />
            {/* <Link
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
            </Link> */}
          </ReactMapGL>
        </Box>
      </HStack>
    </>
  );
};

export default Map;
