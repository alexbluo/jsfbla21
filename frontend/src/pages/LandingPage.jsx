import React from "react";
import { Link } from "react-router-dom";
import MDFlagGIF from "../images/MDFlagGIF.gif";

export default function LandingPage() {
  return (
    <div className="h-screen w-screen">
      <img className="fixed h-full w-full object-cover" src={MDFlagGIF} />

      <div className="fixed z-10 flex h-full w-full flex-col items-center justify-center">
        <h1 className="animate-fade-in-down select-none bg-gradient-to-r from-white to-gold bg-clip-text pb-8 font-montserrat text-5xl font-[1000]  text-transparent opacity-90">
          Maryland Attractions Searcher
        </h1>
        <Link to="/attractions">
          <button className="animate-fade-in-up rounded-md bg-red px-4 py-2 text-white shadow-md duration-200 hover:shadow-white">
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
}
