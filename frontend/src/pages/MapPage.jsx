import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import Map from "../components/Map";

const MapPage = () => {
  // put center as state so that everything rerenders after the user location is returned
  const [center, setCenter] = useState({ lat: 39.2904, lng: -76.6122 });

  // get user location on page load
  // TODO: figure out not in maryland situation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const params = qs.stringify({
          search: "",
          ...coords,
          searchRadius: 20000,
        });
        // check if the user is near maryland by checking if there is a nearby attraction
        const res = await axios.get(`/api/attractions/near?${params}`);
        // set the center to the user's location only if they are nearby, otherwise stay with default
        if (res.data.length > 0) setCenter(coords);
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
