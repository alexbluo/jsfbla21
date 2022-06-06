import { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import qs from "qs";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "rc-slider/assets/index.css";
import SearchBar from "./SearchBar";
import SliderInput from "./SliderInput";

const Map = ({ center, centerName }) => {
  const { mapSearchInput } = useSelector((state) => state.search);
  const [sliderValue, setSliderValue] = useState(20); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(sliderValue * 1000); // in m, passed to query
  const [selectedMarker, setSelectedMarker] = useState(null); // id of the currently selected marker
  const inputRef = useRef();

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

  useEffect(() => {
    if (sliderValue === "0") inputRef.current.select();
  }, [sliderValue]);

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 300) value = 300;
    if (isNaN(value)) value = 0;

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

  // TODO: add options for: recenter, use my location, use default location (baltimore), show all locations
  // show all: set searchRadius to big number so that search still works
  // use default location: set center using function passed down via props
  // use my location:
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
            {/* map each document from the data to a marker */}
            {!isLoading &&
              data.map((doc) => (
                <Marker
                  position={{
                    lat: doc.location.coordinates[1],
                    lng: doc.location.coordinates[0],
                  }}
                  onClick={() => setSelectedMarker(doc.attraction_id)}
                  title={doc.attraction_name}
                  key={doc.attraction_id}
                >
                  {/* only show info window if the currently selected marker's id matched */}
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
                          className="font-normal text-[#2563eb] underline"
                          to={`/attractions/${doc.attraction_id}`}
                          target="_blank"
                        >
                          Details
                        </Link>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>

      <div className="relative aspect-square bg-red p-8 lg:w-1/2">
        <div className="flex flex-col gap-1">
          <SearchBar type="map" />
          <SliderInput
            inputRef={inputRef}
            value={sliderValue.toString()}
            handleSliderChange={(value) => setSliderValue(value)}
            handleSliderAfterChange={(value) => setSearchRadius(value * 1000)}
            handleInputChange={handleInputChange}
          />
        </div>
        <button
          className="absolute bottom-8 left-8 rounded border border-white p-4 font-light text-white duration-200 ease-in-out hover:bg-white hover:text-red"
          onClick={() => setSelectedMarker("recenter")}
        >
          Recenter
        </button>
      </div>
    </div>
  );
};

export default Map;
