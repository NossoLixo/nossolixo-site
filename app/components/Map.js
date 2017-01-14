import React from 'react';
import _ from 'underscore';
import {withGoogleMap, GoogleMap, Marker, InfoWindow} from 'react-google-maps';
import co from 'co';
import $ from 'jquery';
import PlaceService from '../services/PlaceService';

const NossoLixoMap = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoom}
    center={props.currentLocation}
  >
    {props.markers.map((place, index) => (
      <Marker
        title={place.name}
        position={place.position}
        key={index}
        icon='/assets/images/icon.png'
        defaultAnimation={4}
        onClick={ () => props.onMarkerClick(index) }
      >
        {place.requestedInfo && (
          <InfoWindow
            onDomReady={props.onInfoWindowReady}
            >
            <div style={{ display: `none` }}>
              <p><strong>{place.name}</strong></p>
              <p>{place.description}</p>
              <p>{place.street}, {place.number} - {place.district}. {place.city}/{place.state}</p>
              <p>{place.phone_number}</p>
              <p>{place.email}</p>
              <p>{place.site}</p>
              <br />
              <p><strong>Coleta</strong></p>
              <p>{place.categories.map(category => category.name).join(', ')}</p>
            </div>
          </InfoWindow>
        )}
      </Marker>
    ))}
  </GoogleMap>
));

export default class Map extends React.Component {
  constructor () {
    super();
    this.state = { markers: [], currentLocation: this.defaultLocation(), zoom: 4 };
    this.isUnmounted = false;

    _.bindAll(this, 'buildMarkers', 'getLocation', 'locationCallback', 'handleMarkerClick');
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
      place.position = { lat: Number.parseFloat(place.lat), lng: Number.parseFloat(place.lng) };
      place.requestedInfo = false;
      markers.push(place);
    })
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

  handleMarkerClick(placeIndex) {
    var self = this;

    this.state.markers.forEach(function(marker, index) {
      if (index == placeIndex) {
        marker.requestedInfo = true;
      } else {
        marker.requestedInfo = false;
      }
      self.state.markers[index] = marker;
    });

    this.setState({ markers: this.state.markers });
  }

  handleInfoWindowReady() {
    $(this.content).find('div').fadeIn();
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
        onMarkerClick={this.handleMarkerClick}
        onInfoWindowReady={this.handleInfoWindowReady}
      />
    );
  }
}
