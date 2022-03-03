import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import Slider from "rc-slider";
import Marker from "./Marker";
import Popup from "./Popup";
import findFacet from "../utils/findFacet.js";
import "../css/Map.css";

export default function Map({ center }) {
  const _isMounted = useRef(true);
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [markerData, setMarkerData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(async () => {
    const queryParam = `?lng=${center.lng}&lat=${center.lat}&searchRadius=${searchRadius}`;
    const res = await axios.get(`/api/attractions/near${queryParam}`);
    if (_isMounted.current) {
      setMarkerData(res.data);
    }
  }, [searchRadius]);

  function handleInput(event) {
    let value = event.target.value;
    if (value > 500) value = 500;
    if (value < 0) value = 0;
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  return (
    <div className="Map">
      <div className="GoogleMapReact">
        <GoogleMapReact
          bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
          defaultCenter={center}
          defaultZoom={11}
        >
          <Marker lat={center.lat} lng={center.lng} isCenter />
          {markerData.map((doc) => (
            <Marker
              lat={doc.coordinates[1]}
              lng={doc.coordinates[0]}
              onClick={() => setSelectedMarker(doc)}
              name={doc.attraction_name}
              address={doc.address}
              city={findFacet(doc, "city")}
              state={doc.state}
              zip={doc.zip}
              key={doc.attraction_id}
            />
          ))}
        </GoogleMapReact>
        {selectedMarker && (
          <Popup
            data={selectedMarker}
            onCloseClick={() => setSelectedMarker(null)}
          />
        )}
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
