import React from "react";
import NavBar from "../components/NavBar";
import "../css/HelpPage.css"

export default function HelpPage() {
  return (
    <div className="HelpPage container"> 
      {/* regions, city, and type show results that satisfy at least one checked facet, amenities show results that satisfy all checked facets */}
      <NavBar />
      <h1>Help</h1>
      {/* distance from furthest point northwest to furthest point southwest in maryland is ~500km for reference */}
    </div>
  );
}
