import React, { useState, useEffect } from "react";
import Marker from "./Marker";
import GoogleMapReact from "google-map-react";
import "../css/Map.css";

export default function Map(props) {
  const [markerData, setMarkerData] = useState([]);
  const [markerElements, setMarkerElements] = useState([]);

  useEffect(() => {
    const queryParam = `?lng=${props.center.lng}&lat=${props.center.lat}&searchRadius=${props.searchRadius}`;
    fetch(`/api/attractions/near${queryParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log(data));
  }, [props.searchRadius]);

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
