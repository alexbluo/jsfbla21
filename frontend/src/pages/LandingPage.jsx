import React from "react";
import { Link } from "react-router-dom";
import MDFlagGIF from "../images/MDFlagGIF.gif";

export default function LandingPage() {
  return (
    <div className="">
      <img
        className="fixed top-0 left-0 object-cover w-screen h-screen -z-10 "
        src={MDFlagGIF}
      />

      <div className="fixed top-0 left-0 z-10 flex flex-col items-center justify-center w-screen h-screen">
        <h1 className="text-5xl font-bold text-gold font-montserrat animate-fade-in-down">
          Maryland Attractions Searcher
        </h1>
        <Link to="/attractions">
          <button className="px-4 py-2 text-white rounded-md bg-red hover:brightness-75 animate-fade-in-up">
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
}
