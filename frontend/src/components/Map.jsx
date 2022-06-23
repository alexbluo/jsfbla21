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

// TODO: scientifically surgically remove favicon, query, then query max dist to debug chrome
export default function Map({ center, isDefaultCenter }) {
  const { mapSearchInput } = useSelector((state) => state.search);
  // in km, not passed to query
  const [sliderValue, setSliderValue] = useState(10);
  // in m, is passed to query
  const [searchRadius, setSearchRadius] = useState(
    isDefaultCenter ? 20000 * 1000 : sliderValue * 1000
  );
  // data object of the currently selected marker
  const [selectedMarker, setSelectedMarker] = useState(null);
  const inputRef = useRef();

  const { data, error, isLoading, isError } = useQuery(
    ["attraction", mapSearchInput, center.lng, center.lat, searchRadius],
    async () => {
      const params = qs.stringify({
        search: mapSearchInput,
        lng: center.lng,
        lat: center.lat,
        searchRadius,
      });
      const res = await axios.get(`/api/attractions/near?${params}`);
      return res.data; // return to "data"
    },
    { keepPreviousData: true }
  );

  // unselect and reselect center when recentering in case the center was already selected
  useEffect(() => {
    if (selectedMarker === "recenter") setSelectedMarker(center);
  }, [selectedMarker, center]);

  // select the input if it is 0
  useEffect(() => {
    if (sliderValue === 0) inputRef.current.select();
  }, [sliderValue]);

  const handleInputChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (value > 200) value = 200;
    if (Number.isNaN(value)) value = 0;

    setSliderValue(value);
    setSearchRadius(value * 1000);
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return (
      <div>
        Map cannot be loaded right now, sorry. Please make sure that you have
        granted location access.
      </div>
    );
  }

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex w-full flex-col xl:flex-row">
      <div className="aspect-square xl:w-1/2">
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
              animation={window.google.maps.Animation.DROP}
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
                  {/* only show info window if the currently selected marker matches */}
                  {selectedMarker === doc && (
                    <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                      <>
                        <p className="font-medium">{doc.attraction_name}</p>
                        <p>
                          {doc.address}
                          <br />
                          {doc.city}, {doc.state}&nbsp;
                          {doc.zip}
                        </p>
                        <a
                          className="font-normal text-[#2563eb] underline"
                          href={doc.directions_link}
                        >
                          Directions
                        </a>
                      </>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
          </GoogleMap>
        )}
      </div>

      {/* map inputs and selected marker info */}
      <div className="aspect-square bg-red p-8 xl:w-1/2">
        {/* slider, searchbar, show center and show all buttons */}
        <div className="flex h-full flex-col gap-1">
          <SearchBar type="map" />
          {!isDefaultCenter && (
            <>
              <SliderInput
                inputRef={inputRef}
                value={sliderValue.toString()}
                handleSliderChange={(value) => setSliderValue(value)}
                handleSliderAfterChange={(value) =>
                  setSearchRadius(value * 1000)
                }
                handleInputChange={handleInputChange}
              />
              <div className="flex w-full shrink-0 flex-col gap-1 sm:flex-row">
                <Button handleClick={() => setSelectedMarker("recenter")}>
                  Show Center
                </Button>
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
            </>
          )}
          {/* info about whichever marker is selected */}
          {selectedMarker &&
            selectedMarker !== center &&
            selectedMarker !== "recenter" && (
              <section className="flex grow flex-col rounded-md border border-white p-8 xl:overflow-y-auto">
                <h2 className="flex items-center border-b font-montserrat text-2xl font-semibold text-white">
                  {selectedMarker === center
                    ? center.name
                    : selectedMarker.attraction_name}
                </h2>
                <article className="h-full text-white xl:overflow-y-auto">
                  <div className="flex h-full flex-col justify-between gap-4">
                    <p className="pt-4">{selectedMarker.description}</p>
                    {/* link to the currently selected attraction's page */}
                    <Link
                      className="group font-normal text-[#2563eb] underline"
                      to={`/attractions/${selectedMarker.attraction_id}`}
                      target="_blank"
                    >
                      <Button>
                        <div className="flex items-center justify-center">
                          More Details&nbsp;
                          <svg
                            className="fill-white duration-200 ease-in-out group-hover:translate-x-1 group-hover:fill-red"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                          >
                            <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                          </svg>
                        </div>
                      </Button>
                    </Link>
                  </div>
                </article>
              </section>
            )}
        </div>
      </div>
    </div>
  );
}
