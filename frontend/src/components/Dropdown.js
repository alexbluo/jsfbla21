import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import "../css/Dropdown.css";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [labels, setLabels] = useState(null); // change from state to regular const or prob some weird hook
  const [isOpened, setIsOpened] = useState(false); // useState to conditionally render or set to display: none and change?
  // so many ways to do the second one that idek what is best

  const regions = [
    "Capital Region",
    "Central Maryland",
    "Eastern Shore",
    "Southern Maryland",
    "Western Maryland",
  ];

  // maybe use different hook here so doesnt refetch on every render idrk prob not worth the time
  useEffect(() => {
    if (props.category === "Region") {
      setLabels(regions);
    } else if (props.category === "City") {
      fetch("api/facets/cities")
        .then((data) => data.json())
        .then((data) => setLabels(data.cities));
    } else if (props.category === "Type") {
      fetch("api/facets/types")
        .then((data) => data.json())
        .then((data) => setLabels(data.types));
    } else if (props.category === "Amenities") {
      fetch("api/facets/amenities")
        .then((data) => data.json())
        .then((data) => setLabels(data.amenities));
    }
  }, []);

  return (
    <div>
      <h2 className="Dropdown__title">
        {props.category}
        <input
          type="image"
          src={dropdownIcon}
          alt=""
          onClick={() => setIsOpened(!isOpened)}
          className="Dropdown__icon"
        />
      </h2>
      <ul className="Dropdown__contents">
        {isOpened
          ? labels.map((label, index) => <Checkbox label={label} key={index} />)
          : null}
      </ul>
    </div>
  );
}
