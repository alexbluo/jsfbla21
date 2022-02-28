import React from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import "../css/MapPage.css";
import "rc-slider/assets/index.css";

const center = { lat: undefined, lng: undefined }; // initialize so first render doesn't crash

navigator.geolocation.getCurrentPosition((position) => {
  center.lat = position.coords.latitude;
  center.lng = position.coords.longitude;
});

export default function MapPage() {
  return (
    <div className="container px-[8%] py-8">
      <NavBar />
      <h1 className="text-4xl mb-4">Map</h1>
      <Map center={center} />
    </div>
  );
}
