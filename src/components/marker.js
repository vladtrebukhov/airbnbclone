import React from "react";
import "./marker.css";

class Marker extends React.Component {
  state = {};
  render() {
    return <div className="marker">{this.props.text}</div>;
  }
}

export default Marker;
