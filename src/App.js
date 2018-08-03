import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Flat from "./components/flat.js";
import Search from "./components/search.js";
import GoogleMapReact from "google-map-react";
import Marker from "./components/marker.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flats: [],
      selectedFlat: null
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          flats: data
        });
      });
  }

  selectFlat = flat => {
    console.log(flat);
    this.setState({
      selectedFlat: flat
    });
  };

  render() {
    let center = {
      lat: 48.8566,
      lng: 2.3522
    };

    if (this.state.selectedFlat) {
      center = {
        lat: this.state.selectedFlat.lat,
        lng: this.state.selectedFlat.lng
      };
    }

    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <Search />
          </div>
          <div className="flats">
            {this.state.flats.map(flat => {
              return (
                <Flat
                  key={flat.name}
                  flat={flat}
                  selectFlat={this.selectFlat}
                />
              );
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact center={center} zoom={11}>
            {this.state.flats.map(flat => {
              return (
                <Marker
                  key={flat.name}
                  lat={flat.lat}
                  lng={flat.lng}
                  text={flat.price + " " + flat.priceCurrency}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
