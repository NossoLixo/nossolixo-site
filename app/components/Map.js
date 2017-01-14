import React from 'react';
import {withGoogleMap, GoogleMap} from 'react-google-maps';

const NossoLixoMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

var Map = React.createClass({
  render: function() {
    return (
      <NossoLixoMap
        containerElement={
          <div style={{ width: `100%`, height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
});

export default Map;
