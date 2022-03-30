import React, { useState } from "react";
import classNames from "classnames";

export default function Marker(props) {
  const [show, setShow] = useState(false);

  return (
    <div className="group relative inline-flex h-4 w-4 flex-col-reverse items-center">
      <div
        className={classNames(
          "absolute z-10 aspect-square h-4 w-4 cursor-pointer rounded-full border-2 duration-300 ease-out hover:brightness-50",
          { "border-red bg-white": props.isCenter },
          { "border-black bg-gold": !props.isCenter }
        )}
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
