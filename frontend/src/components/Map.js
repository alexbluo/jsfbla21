import React, { useState, useEffect } from "react";
import Marker from "./Marker";
import GoogleMapReact from "google-map-react";
import Slider from "rc-slider";
import "../css/Map.css";

export default function Map(props) {
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [markerData, setMarkerData] = useState([]);
  const [markerElements, setMarkerElements] = useState([]);
  console.log(markerData)
  useEffect(() => {
    const queryParam = `?lng=${props.center.lng}&lat=${props.center.lat}&searchRadius=${searchRadius}`;
    fetch(`/api/attractions/near${queryParam}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMarkerData(data));
  }, [searchRadius]);

  function updateSearchRadius() {
    setSearchRadius(sliderValue * 1000);
  }

  function handleSliderChange(value) {
    setSliderValue(value);
  }

  function handleInput(event) {
    let value = event.target.value;
    if (value > 500) value = 500;
    if (value < 0) value = 0;
    setSliderValue(value);
  }

  console.log(`lat: ${props.center.lat}, lng: ${props.center.lng}`);
  return (
    <div className="Map">
      <div className="GoogleMapReact">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={props.center}
          defaultZoom={11}
        >
          <Marker
            // className="Marker Marker--center"
            lat={props.center.lat}
            lng={props.center.lng}
          />
        </GoogleMapReact>
      </div>
      <div className="Map__search">
        <label>
          <input
            type="number"
            min={0}
            max={500}
            value={sliderValue}
            onInput={handleInput}
            onBlur={updateSearchRadius}
          />
          km
        </label>
        <Slider
          className="MapPage__Slider"
          min={0}
          max={500}
          value={sliderValue}
          onChange={handleSliderChange}
          onAfterChange={updateSearchRadius}
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
