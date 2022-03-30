import React, { useState } from "react";

export default function Marker(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="group relative inline-flex h-4 w-4 flex-col-reverse items-center">
      <div
        className={`absolute z-10 aspect-square h-4 w-4 cursor-pointer rounded-full border-2 ${props.isCenter ? "border-red bg-white" : "border-black bg-gold"
          } duration-300 ease-out hover:brightness-50`}
        onClick={props.onClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      ></div>
      {!props.isCenter && show && (
        <div className="absolute -top-16 z-20 h-16 w-32 origin-bottom animate-spring-scale-up rounded-lg bg-red p-2">
          <h2 className="font-raleway text-xs text-white">{props.name}</h2>
        </div>
      )}
    </div>
  );
}
