import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
  const accessToken =
    'pk.eyJ1Ijoia2FyaW4ta2F6YXJpYW4iLCJhIjoiY2tteWVjMnFpMDM4MTJubWYycTJ5N3Q5ZCJ9.Of9brpnQ8Oc-LGZ6P1ArrA';
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 45.537875,
    longitude: -73.757928,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={accessToken}
      mapStyle='mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1'
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default Map;
