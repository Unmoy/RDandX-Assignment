import React, { Component } from "react";
import "./Map.css";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "500px",
  height: "300px",
  position: "absolute",
  top: "50px",
  left: "50px",
};
class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
    };
  }
  getGeoInfo = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      });
    }
  };
  componentDidMount() {
    this.getGeoInfo();
  }

  render() {
    return (
      <div className="home_map_wrapper">
        <Map
          style={mapStyles}
          zoom={14}
          center={{
            lat: this.state.lat,
            lng: this.state.lng,
          }}
          google={this.props.google}
        ></Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyC3MqSiZCGyngJbpA1Ks6_b4Lzaw2rE0cU",
})(Maps);
