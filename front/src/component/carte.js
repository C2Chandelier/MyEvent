import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Component } from 'react';

const mapStyles = {
  width: '30%',
  height: '34%',
  left: '100px',
  top: '0px'
};

export class MapContainer extends Component {
  lat = this.props.lat
  lng = this.props.lng
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: this.lat, lng: this.lng }}
      >
        <Marker position={{ lat: this.lat, lng: this.lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyAaCWELQhD7dVoUAprchvklulWycDsmnyE',
    lat: props.lat,
    lng: props.lng
  }
))(MapContainer)