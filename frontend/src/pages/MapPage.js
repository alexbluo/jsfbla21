import React, { useState } from "react";
import Slider from "rc-slider";
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

  function handleSliderChange(value) {
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  function handleInput(event) {
    let value = event.target.value;
    if (value > 125) value = 125;
    if (value < 0) value = 0;
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  return (
    <div className="container">
      <NavBar />
      <h1>Map</h1>
      <Map center={center} searchRadius={searchRadius} />
      <div className="MapPage__search">
        <label>
          <input
            type="number"
            min={0}
            max={125}
            value={sliderValue}
            onInput={handleInput}
          />
          km
        </label>
        <Slider
          className="MapPage__Slider"
          min={0}
          max={125}
          value={sliderValue}
          onChange={handleSliderChange}
          railStyle={{
            backgroundColor: "var(--flag-gold)",
            height: 2,
          }}
          trackStyle={{
            backgroundColor: "var(--flag-black)",
            marginTop: -1,
            marginLeft: 1,
            width: 90,
            height: 4,
          }}
          handleStyle={{
            height: 14,
            width: 14,
            marginTop: -6,
            borderRadius: "50%",
            borderColor: "var(--flag-black)",
            backgroundColor: "var(--flag-gold)",
          }}
        />
      </div>
    </div>
  );
}
