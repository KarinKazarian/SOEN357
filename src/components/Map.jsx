import React, { useState, useRef, useCallback } from 'react';
import ReactMapGL from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';
import { Box} from '@material-ui/core';
import {useDisclosure} from '@chakra-ui/react';
import LocationInfo from "./LocationInfo"


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

 const test2 = useRef("");
 console.log("test33333333: ", test2?.current?.cachedResult?.place_name);

  return (
    <Box height="100%" width="100%" position="absolute">
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        position="absolute"
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1"
        onViewportChange={handleViewportChange}
        onTransitionStart={onOpen}
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
        <LocationInfo isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
      </div> 
    </Box>
  );
};

export default Map;
