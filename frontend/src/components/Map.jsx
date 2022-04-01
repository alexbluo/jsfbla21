import { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import qs from "qs";
import GoogleMapReact from "google-map-react";
import Slider from "rc-slider";
import Marker from "./Marker";
import Preview from "./Preview";
import "rc-slider/assets/index.css";

// TODO 6: switch to either googlemaps/js-api-loader or 
export default function Map({ center }) {
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { data, error, isLoading, isError } = useQuery(
    ["attraction", center.lng, center.lat, searchRadius],
    async () => {
      const params = qs.stringify({
        lng: center.lng,
        lat: center.lat,
        searchRadius: searchRadius,
      });
      const res = await axios.get(`/api/attractions/near?${params}`);
      return res.data; // return to "data"
    }
  );

  function handleInput(event) {
    let value = event.target.value;
    if (value > 500) value = 500;
    if (value < 0) value = 0;
    setSliderValue(value);
  }

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="aspect-square lg:w-full">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
          }}
          defaultCenter={center}
          defaultZoom={11}
        >
          <Marker lat={center.lat} lng={center.lng} isCenter />
          {!isLoading &&
            data.map((doc) => (
              <Marker
                lat={doc.coordinates[1]}
                lng={doc.coordinates[0]}
                onClick={() => setSelectedMarker(doc)}
                name={doc.attraction_name}
                key={doc.attraction_id}
              />
            ))}
        </GoogleMapReact>
      </div>

      <div className="flex aspect-square flex-col bg-red lg:w-full">
        <div className="flex w-full items-center p-4">
          <label className="mr-2 flex font-semibold">
            <input
              className="mr-1 w-10 rounded border-2 text-center"
              type="number"
              min={0}
              max={500}
              value={sliderValue}
              onInput={handleInput}
            />
            km
          </label>
          <Slider
            className="mx-2"
            min={0}
            max={500}
            value={sliderValue}
            onChange={(value) => setSliderValue(value)}
            onAfterChange={() => setSearchRadius(sliderValue * 1000)}
            railStyle={{
              backgroundColor: "black",
              height: 3,
              marginTop: 1,
            }}
            trackStyle={{
              backgroundColor: "gold",
              marginLeft: -1,
            }}
            handleStyle={{
              height: 15,
              width: 15,
              borderRadius: "50%",
              borderColor: "gold",
              backgroundColor: "gold",
              boxShadow: "none",
            }}
          />
        </div>
        {selectedMarker && (
          <div className="h-full w-full">
            <Preview data={selectedMarker} />
          </div>
        )}
      </div>
    </div>
  );
}
