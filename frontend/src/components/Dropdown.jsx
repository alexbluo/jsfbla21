import React, { useState, useContext } from "react";
import Checkbox from "./Checkbox";
import { FacetsContext } from "./Facets";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);
  const { facets } = useContext(FacetsContext);

  return (
    <div>
      <h2 className="text-xl text-gold">
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
        } text-base max-h-48 ml-4 mt-2 p-0 overflow-y-auto`}
      >
        {facets[props.category] &&
          Object.keys(facets[props.category]).map((field, index) => (
            <Checkbox category={props.category} field={field} key={index} />
          ))}
      </ul>
    </div>
  );
}
