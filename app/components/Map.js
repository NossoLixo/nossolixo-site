import React from 'react';
import _ from 'underscore';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import co from 'co';
import PlaceService from '../services/PlaceService';

const NossoLixoMap = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoom}
    center={props.currentLocation}
  >
    {props.markers.map((marker, index) => (
      <Marker
        title={marker.title}
        position={marker.position}
        key={index}
        icon='/assets/images/icon.png'
      />
    ))}
  </GoogleMap>
));

export default class Map extends React.Component {
  constructor () {
    super();
    this.state = { markers: [], currentLocation: this.defaultLocation(), zoom: 4 };
    this.isUnmounted = false;

    _.bindAll(this, 'buildMarkers', 'getLocation', 'locationCallback');
  }

  componentDidMount() {
    var fn = co.wrap(function* (val) {
      return yield Promise.resolve(val);
    });

    this.getLocation();

    var placeService = new PlaceService();
    fn(placeService.all())
      .then(this.buildMarkers)
      .catch(this.rescueError);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
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

  defaultLocation() {
    return {
      lat: -11.996921,
      lng: -51.957208
    }
  }

  getLocation() {
    if (!_.isUndefined(navigator) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationCallback);
    }
  }

  locationCallback(position) {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      currentLocation: { lat: position.coords.latitude, lng: position.coords.longitude },
      zoom: 12
    });
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
        zoom={this.state.zoom}
        currentLocation={this.state.currentLocation}
        markers={this.state.markers}
      />
    );
  }
}
