import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

const Map = () => {
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
      mapboxApiAccessToken={
        process.env.REACT_APP_MAPBOX_TOKEN || secrets.REACT_APP_MAPBOX_TOKEN
      }
      mapStyle='mapbox://styles/karin-kazarian/ckmyepr931r7317prtkdbrhj1'
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default Map;
