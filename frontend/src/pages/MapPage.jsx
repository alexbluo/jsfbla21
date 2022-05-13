import { useEffect, useState } from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";

const MapPage = () => {
  const [center, setCenter] = useState(undefined);
  
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
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Map</h1>
        {center && <Map center={center} centerName="You" />}
      </div>
    </>
  );
};

export default MapPage;
