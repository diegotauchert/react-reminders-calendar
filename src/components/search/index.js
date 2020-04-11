import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar';
import Script from 'react-load-script';

const google = window.google;

export default class Search extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      query: ''
    };

  }

  handleScriptLoad() { 
      const options = { types: ['(cities)'] }; 

      this.autocomplete = new google.maps.places.Autocomplete(
                            document.getElementById('autocomplete'),
                            options);

      this.autocomplete.setFields(['address_components',   
                                    'formatted_address']);
      this.autocomplete.addListener('place_changed',
                                    this.handlePlaceSelect); 
  }

  handlePlaceSelect = () => {
      const addressObject = this.autocomplete.getPlace();
      const address = addressObject.address_components;

      if (address) {
        this.setState(
          {
            city: address[0].long_name,
            query: addressObject.formatted_address,
          }
        );
      }
  }

  render() {
    return (
      <div>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7z_3U5VOO0D4Y1knT9FbHs1P6eYxFIhI&libraries=places"          
          onLoad={this.handleScriptLoad}        
        />   
        <SearchBar id="autocomplete" placeholder="" hintText="Search City" value={this.state.query}
          style={{
            margin: '0 auto',
            maxWidth: 800,
          }}
        />
      </div>
    );
  }
}