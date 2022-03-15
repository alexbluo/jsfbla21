import React, { useState } from "react";

export default function Marker(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex flex-col-reverse items-center">
      <div
        className={`absolute w-4 z-10 aspect-square border-2 rounded-full cursor-pointer ${
          props.isCenter ? "bg-white border-red" : "bg-gold border-black"
        } hover:brightness-50 duration-300 ease-out`}
        onClick={props.onClick}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      ></div>
      {show && (
        <div className="absolute w-32 h-16 origin-bottom rounded-lg -top-20 bg-red animate-spring-scale-up"></div>
      )}
    </div>
  );
}
