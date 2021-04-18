import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { HStack, Box, useToast, Center } from '@chakra-ui/react';
import LocationInfo from './LocationInfo';
import { makePostRequest, makePostRequestLive } from '../utils/api/besttime';
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

  const accessToken =
    'pk.eyJ1Ijoia2FyaW4ta2F6YXJpYW4iLCJhIjoiY2tteWVjMnFpMDM4MTJubWYycTJ5N3Q5ZCJ9.Of9brpnQ8Oc-LGZ6P1ArrA';

  const [viewport, setViewport] = useState({
    latitude: 45.4644455,
    longitude: -73.745181,
    zoom: 8,
  });

  const [liveData, setLiveData] = useState(0);
  const [buynessData, setBuynessData] = useState([]);
  const mapRef = useRef();
  const geocoderContainerRef = useRef();
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

  const requestLiveData = async (locationName, locationAddress) => {
    try {
      var response = await makePostRequestLive({
        api_key_private: 'pri_7b5f18965b7d46a5b708eeee58fc2354',
        venue_address: locationAddress,
        venue_name: locationName,
      });
      if (response.data.status !== 'Error') {
        const busyness = response?.data.analysis?.venue_live_busyness;
        setLiveData(busyness);
      } else {
        throw response.data;
      }
    } catch (err) {
      setLiveData(0);
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const requestBusynessData = async (locationName, locationAddress) => {
    try {
      const response = await makePostRequest({
        api_key_private: 'pri_7b5f18965b7d46a5b708eeee58fc2354',
        venue_address: locationAddress,
        venue_name: locationName,
      });
      if (response.data.status !== 'Error') {
        const rawData = response?.data?.analysis;
        setBuynessData(rawData);
      } else {
        setBuynessData([]);
        throw response.data;
      }
    } catch (err) {
      setLiveData(0);
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const requestData = async (results) => {
    const [locationName, locationAddress] = getParams(results);
    if (!locationName || !locationAddress) return;
    requestBusynessData(locationName, locationAddress);
    requestLiveData(locationName, locationAddress);
  };

  const getParams = (results) => {
    const placeName = results.result.place_name;
    if (placeName != null) {
      const locationName = placeName.slice(0, placeName.indexOf(','));
      const locationAddress = placeName.substring(placeName.indexOf(',') + 1);
      return [locationName, locationAddress];
    }
    return ['', ''];
  };

  return (
    <>
      <HStack spacing='5px'>
        <StyledBox
          alignSelf='baseline'
          w='35%'
          resize='horizontal'
          overflow='scroll'
          h={windowSize.height - 96}
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
          <LocationInfo liveData={liveData} buynessData={buynessData} />
        </StyledBox>

        <Box w='90%' h={windowSize.height - 96}>
          <ReactMapGL
            ref={mapRef}
            {...viewport}
            height='100%'
            width='100%'
            mapboxApiAccessToken={accessToken}
            mapStyle='mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1'
            onViewportChange={handleViewportChange}
            //onTransitionEnd={apiTest}
          >
            <Geocoder
              mapRef={mapRef}
              containerRef={geocoderContainerRef}
              onViewportChange={handleGeocoderViewportChange}
              mapboxApiAccessToken={accessToken}
              onResult={requestData}
            />
          </ReactMapGL>
        </Box>
      </HStack>
    </>
  );
};

export default Map;
