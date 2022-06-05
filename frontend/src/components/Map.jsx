import { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "rc-slider/assets/index.css";
import SearchBar from "./SearchBar";

const Map = ({ center, centerName }) => {
  const { mapSearchInput } = useSelector((state) => state.search);
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [selectedMarker, setSelectedMarker] = useState(null); // id of the currently selected marker

  const { data, error, isLoading, isError } = useQuery(
    ["attraction", mapSearchInput, center.lng, center.lat, searchRadius],
    async () => {
      const params = qs.stringify({
        search: mapSearchInput,
        lng: center.lng,
        lat: center.lat,
        searchRadius: searchRadius,
      });
      const res = await axios.get(`/api/attractions/near?${params}`);
      return res.data; // return to "data"
    },
    { keepPreviousData: true }
  );

  // unselect and reselect center when recentering in case the center was already selected
  useEffect(() => {
    if (selectedMarker === "recenter") setSelectedMarker("center");
  }, [selectedMarker]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (value > 300) value = 300;
    if (value < 0) value = 0;

    setSliderValue(value);
    setSearchRadius(value * 1000);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError)
    return (
      <div>
        Map cannot be loaded right now, sorry. Please make sure that you have
        granted location access.
      </div>
    );
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex w-full flex-col lg:flex-row">
      <div className="aspect-square lg:w-1/2">
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
                      lat: doc.location.coordinates[1],
                      lng: doc.location.coordinates[0],
                    }}
                    // clusterer={clusterer}
                    // this fixes the lag but introduces another bug - new query results aren't updated unless zoom
                    // noClustererRedraw={true}
                    onClick={() => setSelectedMarker(doc.attraction_id)}
                    title={doc.attraction_name}
                    key={doc.attraction_id}
                  >
                    {selectedMarker === doc.attraction_id && (
                      <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                        <div>
                          <span className="font-medium">
                            {doc.attraction_name}
                          </span>
                          <br />
                          {doc.address}
                          <br />
                          {doc.city}, {doc.state}&nbsp;
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

      {/* TODO: extract into separate component MapInput */}
      <div className="relative aspect-square bg-red p-8 lg:w-1/2">
        <SearchBar type="map" />
        <div className="flex h-16 w-full items-center gap-4">
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
              borderColor: "gold",
              backgroundColor: "gold",
              boxShadow: "none",
            }}
          />
          <label className="flex h-full gap-2 rounded bg-white px-4 brightness-90 focus-within:brightness-100">
            <input
              className="my-auto w-6 rounded text-right"
              type="number"
              min={0}
              max={300}
              value={sliderValue}
              onChange={handleChange}
            />
            <span className="my-auto">km</span>
          </label>
        </div>
        <button
          className="absolute bottom-8 left-8 rounded border border-white p-4 font-light text-white duration-200 hover:bg-white hover:text-red"
          onClick={() => setSelectedMarker("recenter")}
        >
          Recenter
        </button>
      </div>
    </div>
  );
};

export default Map;
