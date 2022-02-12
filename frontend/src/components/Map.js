import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import Slider from "rc-slider";
import Marker from "./Marker";
import Popup from "./Popup";
import "../css/Map.css";
import findFacet from "../utils/findFacet";

export default function Map(props) {
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [markerData, setMarkerData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  function handleInput(event) {
    let value = event.target.value;
    if (value > 500) value = 500;
    if (value < 0) value = 0;
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  return (
    <div>
      <div className="GoogleMapReact">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={props.center}
          defaultZoom={11}
        >
          <Marker lat={props.center.lat} lng={props.center.lng} isCenter />
          {markerData.map((doc) => (
            <Marker
              lat={doc.coordinates[1]}
              lng={doc.coordinates[0]}
              onClick={() => setSelectedMarker(doc)} // ultimately passes this marker's data to Popup
              name={doc.attraction_name}
              address={doc.address}
              city={findFacet(doc, "city")}
              state={doc.state}
              zip={doc.zip}
              key={doc.attraction_id}
            />
          ))}
        </GoogleMapReact>
        {selectedMarker ? (
          <Popup data={selectedMarker} onCloseClick={() => setSelectedMarker(null)} />
        ) : null}
      </div>
      <div className="Map__search">
        <label>
          <input
            type="number"
            min={0}
            max={500}
            value={sliderValue}
            onInput={handleInput}
          />
          km
        </label>
        <Slider
          className="MapPage__Slider"
          min={0}
          max={500}
          value={sliderValue}
          onChange={(value) => setSliderValue(value)}
          onAfterChange={() => setSearchRadius(sliderValue * 1000)}
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
