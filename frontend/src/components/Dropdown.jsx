import React, { useState } from "react";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="bg-black">
      <div
        className="flex items-center p-3 rounded cursor-pointer bg-gold"
        onClick={() => setIsOpened(!isOpened)}
      >
        {/* TODO: animate dropdown icon => migrate to react query => redo maps */}
        <h2 className="text-lg text-black font-raleway">
          {props.category.toUpperCase()}
        </h2>
        <img
          className={`w-3 h-3 ml-2 transition-transform ${
            isOpened && "rotate-90"
          }`}
          src={dropdownIcon}
          alt=""
        />
      </div>
      <ul
        className={`${
          isOpened ? "max-h-48 my-4" : "max-h-0 overflow-hidden"
        } font-raleway text-base text-gold mx-4 overflow-y-auto duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]`}
      >
        {/* checkboxes */}
        {props.children}
      </ul>
    </div>
  );
}
