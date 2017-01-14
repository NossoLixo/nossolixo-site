import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import co from 'co';
import PlaceService from '../services/PlaceService';

const NossoLixoMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{
      lat: -10.9919196,
      lng: -37.0984939
    }}
  >
    {props.markers.map((marker, index) => (
      <Marker
        title={marker.title}
        position={marker.position}
        key={index}
      />
    ))}
  </GoogleMap>
));

export default class Map extends React.Component {
  constructor () {
    super();
    this.state = { markers: [] };

    var fn = co.wrap(function* (val) {
      return yield Promise.resolve(val);
    });

    var placeService = new PlaceService(),
        buildMarkers = this.buildMarkers.bind(this);

    fn(placeService.all())
      .then(buildMarkers)
      .catch(this.rescueError);
  }

  buildMarkers(response) {
    var markers = [];

    response.body.forEach(function(place) {
      var marker = {
        title: place.name,
        position: {
          lat: Number.parseFloat(place.lat),
          lng: Number.parseFloat(place.lng)
        }
      };
      markers.push(marker);
    });

    this.setState({ markers: markers });
  }

  rescueError(err) {
    console.error(err.stack);
  }

  render() {
    return (
      <NossoLixoMap
        containerElement={
          <div style={{ width: `100%`, height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={this.handleMapLoad}
        markers={this.state.markers}
      />
    );
  }
}
