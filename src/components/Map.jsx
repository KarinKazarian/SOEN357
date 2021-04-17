import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { HStack, Box, useToast, Center } from '@chakra-ui/react';
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
  const testData = [
    {
      day_info: {
        day_int: 0,
        day_rank_max: 6,
        day_rank_mean: 4,
        day_text: 'Monday',
        venue_closed: 6,
        venue_open: 23,
      },
      day_raw: [
        10,
        25,
        40,
        55,
        65,
        75,
        75,
        75,
        75,
        75,
        70,
        65,
        50,
        40,
        30,
        25,
        25,
        25,
        20,
        15,
        10,
        0,
        5,
        5,
      ],
      hour_analysis: [
        {
          hour: 6,
          intensity_nr: -1,
          intensity_txt: 'Below average',
        },
      ],
      peak_hours: [
        {
          peak_start: 8,
          peak_max: 11,
          peak_end: 23,
          peak_intensity: 4,
        },
      ],
      quiet_hours: [6, 1, 2, 3],
      busy_hours: [9, 10, 11, 12],
      surge_hours: {
        most_people_come: 8,
        most_people_leave: 22,
      },
    },
    {
      day_info: {
        day_int: 1,
        day_rank_max: 6,
        day_rank_mean: 4,
        day_text: 'Monday',
        venue_closed: 6,
        venue_open: 23,
      },
      day_raw: [
        30,
        100,
        100,
        55,
        65,
        5,
        35,
        7,
        45,
        45,
        60,
        65,
        0,
        40,
        30,
        25,
        25,
        25,
        20,
        15,
        10,
        0,
        5,
        5,
      ],
      hour_analysis: [
        {
          hour: 6,
          intensity_nr: -1,
          intensity_txt: 'Below average',
        },
      ],
      peak_hours: [
        {
          peak_start: 8,
          peak_max: 11,
          peak_end: 23,
          peak_intensity: 4,
        },
      ],
      quiet_hours: [6, 1, 2, 3],
      busy_hours: [9, 10, 11, 12],
      surge_hours: {
        most_people_come: 8,
        most_people_leave: 22,
      },
    },
  ];

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

  const [liveData, setLiveData] = useState(0);
  const [buynessData, setBuynessData] = useState({});
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
      console.log('liveResponse: ', response);
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
    //requestBusynessData(locationName, locationAddress);
    //requestLiveData(locationName, locationAddress);
  };

  const getParams = (results) => {
    const placeName = results.result.place_name;
    if (placeName != null) {
      const locationName = placeName.slice(0, placeName.indexOf(','));
      const locationAddress = placeName.substring(placeName.indexOf(',') + 1);
      console.log('in the if');
      return [locationName, locationAddress];
    }
    console.log('out of the if');
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
          <LocationInfo liveData={liveData} buynessData={testData} />
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
