import React from "react";
import { Link } from "react-router-dom";
import MDFlagGIF from "../images/MDFlagGIF.gif";

export default function LandingPage() {
  return (
    <div className="w-screen h-screen">
      <img className="fixed object-cover w-full h-full" src={MDFlagGIF} />

      <div className="fixed z-10 flex flex-col items-center justify-center w-full h-full">
        <h1 className="pb-8 text-5xl opacity-80 font-[1000] text-transparent select-none font-montserrat animate-fade-in-down bg-clip-text bg-gradient-to-r  from-white to-gold">
          Maryland Attractions Searcher
        </h1>
        <Link to="/attractions">
          <button className="px-4 py-2 text-white duration-200 rounded-md shadow-md bg-red hover:brightness-75 animate-fade-in-up hover:shadow-white">
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
}
