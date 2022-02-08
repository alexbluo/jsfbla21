import React, { useState, useEffect } from "react";
import Slider, { Range } from "rc-slider";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import "../css/MapPage.css";

const center = { lat: undefined, lng: undefined };

navigator.geolocation.getCurrentPosition((position) => {
  center.lat = position.coords.latitude;
  center.lng = position.coords.longitude;
});

export default function MapPage() {
  const [searchRadius, setSearchRadius] = useState(20); // searchRadius is in miles

  useEffect(() => {
    console.log(searchRadius);

  }, [searchRadius])

  function handleSliderChange(value) {
    setSearchRadius(value);
  }

  return (
    <div className="container">
      <NavBar />
      <h1>Map</h1>
      <Map center={center} /* searchRadius={searchRadius} */ />
      <Slider
        min={0}
        max={125}
        defaultValue={100}
        value={searchRadius}
        onChange={handleSliderChange}
        railStyle={{
          backgroundColor: "grey",
          height: 2,
        }}
        handleStyle={{
          height: 28,
          width: 28,
          marginLeft: -14,
          marginTop: -14,
          backgroundColor: "blue",
          border: 0,
        }}
      />
    </div>
  );
}
