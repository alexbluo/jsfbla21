import React, { useState, useEffect } from "react";
import Slider, { SliderTooltip, createSliderWithTooltip } from "rc-slider";
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
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to map
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to map

  useEffect(() => {
    console.log(searchRadius);
    console.log(sliderValue);
  }, [searchRadius]);
  
  function handleSliderChange(value) {
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  return (
    <div className="container">
      <NavBar />
      <h1>Map</h1>
      <Map center={center} searchRadius={searchRadius} />
        <Slider
          min={0}
          max={125}
          dots
          step={5}
          value={sliderValue}
          onChange={handleSliderChange}
          railStyle={{
            backgroundColor: "yellow",
            height: 2,
          }}
          trackStyle={{
            backgroundColor: "yellow",
            height: 4,
          }}
          dotStyle={{
            borderColor: "yellow",
            backgroundColor: "black",
          }}
          handleStyle={{
            height: 12,
            width: 12,
            // marginTop: -4,
            borderRadius: "50%",
            backgroundColor: "black",
            border: 0,
          }}
        />
    </div>
  );
}
