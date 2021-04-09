import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Box} from '@material-ui/core';
import {useDisclosure, Button} from '@chakra-ui/react';
import LocationInfo from "./LocationInfo"
import {makePostRequest} from '../utils/api/besttime'; 

const Map = () => {
  const accessToken =
    'pk.eyJ1Ijoia2FyaW4ta2F6YXJpYW4iLCJhIjoiY2tteWVjMnFpMDM4MTJubWYycTJ5N3Q5ZCJ9.Of9brpnQ8Oc-LGZ6P1ArrA';
  const [viewport, setViewport] = useState({
    latitude: 45.537875,
    longitude: -73.757928,
    zoom: 8,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const mapRef = useRef();

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
  let bestTimesData = "";

  
const apiTest = async() => {
  const response = await makePostRequest({
    api_key_private:"pri_7b5f18965b7d46a5b708eeee58fc2354",
    venue_address: locationAddress,
    venue_name: locationName
  });
  bestTimesData = response?.data?.analysis?.[0]?.quiet_hours;
  console.log('Quiet Hours: ', response?.data?.quiet_hours);
  console.log('json response: ', response);
  console.log('json data: ', response?.data);
  console.log('json analysis: ', response?.data?.analysis);
  console.log('json array 0: ', response?.data?.analysis?.[0]);
  console.log('json quiet hours: ', response?.data?.analysis?.[0]?.quiet_hours);
  onOpen();
}
 const test2 = useRef("");
 const locationName = test2?.current?.cachedResult?.place_name.slice(0, test2?.current?.cachedResult?.place_name.indexOf(','));
 const locationAddress = test2?.current?.cachedResult?.place_name.substring(test2?.current?.cachedResult?.place_name.indexOf(",")+1);
//  console.log("Location:", locationName);
//  console.log("Location Address:", locationAddress);

  return (
    <Box height="100%" width="100%" position="absolute">
              <Button onClick={apiTest} >Get Busy Data</Button>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        position="absolute"
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1"
        onViewportChange={handleViewportChange}
        onTransitionEnd={apiTest}
      >
        <Geocoder
          mapRef={mapRef}
          ref={test2}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={accessToken}
          width="100%"
          position="top-left"
        />
      </ReactMapGL>
      <div>
        <LocationInfo isOpen={isOpen} onOpen={onOpen} onClose={onClose} locationAddress={locationAddress} locationName={locationName} bestTimeData = {bestTimesData}/>

      </div> 
    </Box>
  );
};

export default Map;
