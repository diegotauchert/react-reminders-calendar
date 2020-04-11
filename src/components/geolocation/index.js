import React, { Component,Fragment } from 'react';
import ReactDOM from 'react-dom';
import { geolocated } from "react-geolocated";

import Weather from "../weather";

class Geolocation extends Component {
  
    render() {
      return !this.props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <Weather latitude={this.props.coords.latitude} longitude={this.props.coords.longitude} />
    ) : (
        <div>Getting the location data&hellip; </div>
    );
    }
}

export default geolocated({
  positionOptions: {
      enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Geolocation);

