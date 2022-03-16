import React from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import "../css/MapPage.css";

let center = undefined; // initialize so first render doesn't crash

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    center = {};
    center.lat = position.coords.latitude;
    center.lng = position.coords.longitude;
  });
}

export default function MapPage() {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Map</h1>
        {center && <Map center={center} />}
      </div>
    </>
  );
}
