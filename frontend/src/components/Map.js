import React, { useState } from "react";
import Marker from "./Marker";
import GoogleMapReact from "google-map-react";
import "../css/Map.css";

export default function Map(props) {
  console.log(props.center)
  
  return (
    <div className="Map">
        <div className="GoogleMapReact">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={props.center}
            defaultZoom={11}
          ></GoogleMapReact>
        </div>
    </div>
  );
}
