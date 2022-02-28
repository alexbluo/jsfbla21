import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="LandingPage container">
      <h1>Maryland Attractions Searcher</h1>
      <Link to="/attractions">
        <button>Attractions</button>
      </Link>
      <Link to="/map">
        <button>Map</button>
      </Link>
      <Link to="/help">
        <button>Help</button>
      </Link>
    </div>
  );
}
