import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
  // MarkerClusterer,
} from "@react-google-maps/api";
import axios from "axios";
import qs from "qs";
import Slider from "rc-slider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import findFilter from "../utils/findFilter";
import "rc-slider/assets/index.css";

const Map = ({ center, centerName }) => {
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  
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
    },
    { keepPreviousData: true }
  );

  const handleInput = (e) => {
    let value = e.target.value;
    if (value > 300) value = 300;
    if (value < 0) value = 0;
    setSliderValue(value);
    setSearchRadius(value * 1000);
  }

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="aspect-square lg:w-full">
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={11}
            clickableIcons={false}
          >
            <Marker
              position={center}
              onClick={() => setSelectedMarker("center")}
              animation={google.maps.Animation.DROP}
            >
              {selectedMarker === "center" && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                  <div>{centerName}</div>
                </InfoWindow>
              )}
            </Marker>
            {
              !isLoading &&
                // MarkerClusterer causes lag
                // <MarkerClusterer
                //   averageCenter={true}
                //   minimumClusterSize={4}
                //   zoomOnClick={false}
                // >
                //   {(clusterer) =>
                data.map((doc) => (
                  <Marker
                    position={{
                      lat: doc.coordinates[1],
                      lng: doc.coordinates[0],
                    }}
                    // clusterer={clusterer}
                    // this fixes the lag but introduces another bug - new query results aren't updated unless zoom
                    // noClustererRedraw={true}
                    onClick={() => setSelectedMarker(doc)}
                    title={doc.attraction_name}
                    key={doc.attraction_id}
                  >
                    {selectedMarker === doc && (
                      <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                        <div>
                          <span className="font-medium">
                            {doc.attraction_name}
                          </span>
                          <br />
                          {doc.address}
                          <br />
                          {findFilter(doc, "city")}, {doc.state}&nbsp;
                          {doc.zip}
                          <br />
                          <Link
                            className="font-normal text-blue-600 hover:underline"
                            to={`/attractions/${doc.attraction_id}`}
                            target="_blank"
                          >
                            Details
                          </Link>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))
              //   }
              // </MarkerClusterer>
            }
          </GoogleMap>
        )}
      </div>

      {/* TODO: add toggle between slider and search (and search too - the map package has it) */}
      <div className="relative aspect-square h-full bg-red lg:w-full">
        <div className="flex w-full items-center gap-4 p-6">
          <Slider
            min={0}
            max={300}
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
          <label className="flex rounded bg-white">
            <input
              className="w-8 rounded py-1 text-right"
              type="number"
              min={0}
              max={300}
              value={sliderValue}
              onChange={handleInput}
            />
            <span className="p-1">km</span>
          </label>
        </div>
        <button
          className="absolute te bottom-6 left-6 rounded border border-white p-4 font-light text-white duration-200 hover:bg-white hover:text-red"
          onClick={() => setSelectedMarker("center")}
        >
          Show Center
        </button>
      </div>
    </div>
  );
};

export default Map;
