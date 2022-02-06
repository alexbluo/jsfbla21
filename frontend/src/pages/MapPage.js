import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import NavBar from "../components/NavBar";
import "../css/MapPage.css";

export default function MapPage() {
  const [searchRadius, setSearchRadius] = useState();
  // useref or define location in outer scope?

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("lat: " + position.coords.latitude);
      console.log("lon: " + position.coords.longitude);
    });
  }

  getLocation();
  return (
    <div>
      <NavBar />
      <Map center= />
    </div>
  );
}
