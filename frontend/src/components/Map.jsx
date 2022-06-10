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
import Button from "./Button";
import SearchBar from "./SearchBar";
import SliderInput from "./SliderInput";

const Map = ({ center, isDefaultCenter }) => {
  const { mapSearchInput } = useSelector((state) => state.search);
  const [sliderValue, setSliderValue] = useState(10); // in km, not passed to query
  const [searchRadius, setSearchRadius] = useState(
    isDefaultCenter ? 20000 * 1000 : sliderValue * 1000
  ); // in m, is passed to query
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
    if (selectedMarker === "recenter") setSelectedMarker(center);
  }, [selectedMarker]);

  // select the input if it is 0
  useEffect(() => {
    if (sliderValue === 0) inputRef.current.select();
  }, [sliderValue]);

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 200) value = 200;
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
              onClick={() => setSelectedMarker(center)}
              animation={google.maps.Animation.DROP}
            >
              {selectedMarker === center && (
                <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                  <div>{center.name}</div>
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
                  onClick={() => setSelectedMarker(doc)}
                  title={doc.attraction_name}
                  key={doc.attraction_id}
                >
                  {/* only show info window if the currently selected marker's id matched */}
                  {selectedMarker === doc && (
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

      <div className="aspect-square bg-red p-8 lg:w-1/2">
        <div className="flex h-full flex-col justify-between">
          <div className="flex flex-col gap-1">
            <SearchBar type="map" />
            {!isDefaultCenter && (
              <SliderInput
                inputRef={inputRef}
                value={sliderValue.toString()}
                handleSliderChange={(value) => setSliderValue(value)}
                handleSliderAfterChange={(value) =>
                  setSearchRadius(value * 1000)
                }
                handleInputChange={handleInputChange}
              />
            )}
            {selectedMarker && selectedMarker !== "recenter" && (
              <section className="flex grow flex-col rounded-md border border-white p-4 lg:overflow-y-scroll">
                <h2 className="flex items-center border-b font-raleway text-4xl font-semibold text-white">
                  {selectedMarker === center
                    ? center.name
                    : selectedMarker.attraction_name}
                </h2>
                <article className="pt-4 text-white lg:overflow-y-scroll">
                  {selectedMarker.description}
                </article>
              </section>
            )}
          </div>
          {!isDefaultCenter && (
            <div className="flex w-full shrink-0 flex-col gap-1 sm:flex-row">
              <Button handleClick={() => setSelectedMarker("recenter")}>
                Show Center
              </Button>
              {/* TODO: maybe extract into state */}
              <Button
                handleClick={() =>
                  setSearchRadius((prev) =>
                    // half the circumference of the Earth in meters, actually the best and simplect implementation since it still allows for search bar queries
                    prev === 20000 * 1000 ? sliderValue * 1000 : 20000 * 1000
                  )
                }
              >
                Show {searchRadius === 20000 * 1000 ? "Specified" : "All"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
