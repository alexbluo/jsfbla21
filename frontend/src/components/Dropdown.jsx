import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <h2 className="mb-2 text-xl text-gold">
        {props.category.toUpperCase()}
        <input
          className="w-3 h-3 ml-2"
          type="image"
          src={dropdownIcon}
          alt=""
          onClick={() => setIsOpened(!isOpened)}
        />
      </h2>
      <ul
        className={`${
          isOpened ? "block" : "hidden"
        } text-base max-h-48 ml-4 p-0 overflow-y-auto`}
      >
        {props.children}
        {/* checkboxes */}
      </ul>
    </div>
  );
}
