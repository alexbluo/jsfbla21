import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import Map from "../components/Map";

// the map's center is located in Baltimore is the user is unable to provide their location
const defaultCenter = {
  lat: 39.2904,
  lng: -76.6122,
  name: "Default Center - Baltimore",
  description:
    "This is the default center for users who are either too far away from Maryland or don't have location services enabled. For more information, see the help page.",
};

const MapPage = () => {
  const [center, setCenter] = useState(null);

  // get user location on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            // rounded to four decimal places for query key consistency
            lat: Number(position.coords.latitude.toFixed(4)),
            lng: Number(position.coords.longitude.toFixed(4)),
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
            setCenter({
              ...coords,
              name: "You",
              description: "Your current location.",
            });
          } else {
            setCenter(defaultCenter);
          }
        },
        // handle error when user denies location access
        (err) => {
          setCenter(defaultCenter);
        }
      );
    }
  }, []);

  return (
    <>
      <h1 className="page-title">Map</h1>
      {center && (
        <Map center={center} isDefaultCenter={center === defaultCenter} />
      )}
    </>
  );
};

export default MapPage;
