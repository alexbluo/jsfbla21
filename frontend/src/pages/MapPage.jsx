import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import Map from "../components/Map";

// used in child to determine whether the map is using the user as the center or the default center
export const defaultCenterName = "Default Center - Baltimore";

const MapPage = () => {
  // default to coordinates of baltimore
  const [center, setCenter] = useState({ lat: 39.2904, lng: -76.6122 });
  const [centerName, setCenterName] = useState(defaultCenterName);

  // get user location on page load
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
          // max distance
          searchRadius: 200000,
        });
        // check if the user is near maryland by checking if there is an attraction within the max distance (200 km)
        const res = await axios.get(`/api/attractions/near?${params}`);
        // set the center to the user's location only if the user is nearby, otherwise stay with default center
        if (res.data.length > 0) {
          setCenter(coords);
          setCenterName("You");
        }
      });
    }
  }, []);

  return (
    <>
      <h1 className="page-title">Map</h1>
      {center && <Map center={center} centerName={centerName} />}
    </>
  );
};

export default MapPage;
