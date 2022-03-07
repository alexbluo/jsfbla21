import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MDFlagGIF from "../images/MDFlagGIF.gif";

export default function LandingPage() {
  return (
    <div className="mt-[-40px]">
      <img className="w-screen h-screen m-0 p-0" src={MDFlagGIF}></img>
      {/* <h1>Maryland Attractions Searcher</h1>
    //   <Link to="/attractions">
    //     <button>Attractions</button>
    //   </Link>
    //   <Link to="/map">
    //     <button>Map</button>
    //   </Link>
    //   <Link to="/help">
    //     <button>Help</button>
    //   </Link> */}
    </div>
  );
}
