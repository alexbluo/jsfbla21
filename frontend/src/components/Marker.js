import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Marker.css";

export default function Marker(props) {
  return (
    //
    <div
      className={`Marker ${props.isCenter ? "Marker--center" : ""}`}
      onClick={props.onClick}
    ></div>
  );
}
