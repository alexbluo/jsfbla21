import { useEffect, useState } from "react";
import Map from "../components/Map";

const MapPage = () => {
  // put center as state so that everything rerenders after the user location is returned
  const [center, setCenter] = useState({ lat: 39.2904, lng: -76.6122 });

  // get user location on page load
  // TODO: figure out not in maryland situation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(coords);
      });
    }
  }, []);

  return (
    <>
      <h1 className="page-title">Map</h1>
      {center && <Map center={center} centerName="You" />}
    </>
  );
};

export default MapPage;
