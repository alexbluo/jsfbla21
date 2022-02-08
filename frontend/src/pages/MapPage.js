import React, { useState, useEffect } from "react";
import Slider, { Range } from "rc-slider";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import "../css/MapPage.css";
import "rc-slider/assets/index.css";

const center = { lat: undefined, lng: undefined };

navigator.geolocation.getCurrentPosition((position) => {
  center.lat = position.coords.latitude;
  center.lng = position.coords.longitude;
});

export default function MapPage() {
  const [searchRadius, setSearchRadius] = useState(20); // searchRadius is in km

  useEffect(() => {
    console.log(searchRadius);

  }, [searchRadius])

  function handleSliderChange(value) {
    setSearchRadius(value); // convert kilometers to meters
  }

  return (
    <div className="container">
      <NavBar />
      <h1>Map</h1>
      <Map center={center} searchRadius={searchRadius} />
      <Slider
        min={0}
        max={125}
        value={searchRadius}
        onChange={handleSliderChange}
        railStyle={{
          backgroundColor: "yellow",
          height: 3,
        }}
        handleStyle={{
          height: 14,
          width: 14,
          marginLeft: -7,
          marginTop: -7,
          borderRadius: "50%",
          backgroundColor: "black",
          border: 0,
        }}
      />
    </div>
  );
}
