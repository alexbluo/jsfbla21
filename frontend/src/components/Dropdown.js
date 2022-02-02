import React, { useEffect, useState, useContext, useCallback } from "react";
import Checkbox from "./Checkbox";
import { FacetContext } from "../pages/AttractionsPage";
import "../css/Dropdown.css";
import dropdownIcon from "../images/dropdownIcon.png";

async function fetchFacets(category) {
  if (category === "regions") {
    return {
      regions: {
        "Capital Region": false,
        "Central Maryland": false,
        "Eastern Shore": false,
        "Southern Maryland": false,
        "Western Maryland": false,
      },
    };
  } else {
    fetch(`/api/facets/${category}`)
      .then((data) => data.json())
      .then((data) =>);
  }
}

export default function Dropdown(props) {
  const [labels, setLabels] = useState(null); // change from state to regular const or prob some weird hook
  const [isOpened, setIsOpened] = useState(false);
  const { facets, setFacets } = useContext(FacetContext);

  // maybe use different hook here so doesnt refetch on every render idrk prob not worth the time
  useEffect(() => {
    if (props.category === "regions") {
      setFacets({ ...facets, ...fetchFacets(props.category) });
    } else if (props.category === "cities") {
      fetch("api/facets/cities")
        .then((data) => data.json())
        .then((data) => setFacets({ ...facets, ...data.cities }))
        .then((data) => console.log(data));
    } else if (props.category === "types") {
      fetch("api/facets/types")
        .then((data) => data.json())
        .then((data) => setLabels(data.types));
    } else if (props.category === "amenities") {
      fetch("api/facets/amenities")
        .then((data) => data.json())
        .then((data) => setLabels(data[props.category]));
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
