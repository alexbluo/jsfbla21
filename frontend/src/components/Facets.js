import React, { useEffect, useState } from "react";
import "../index.css";

// rough idea
function Checkbox(props) {
  // [isChecked, setIsChecked] = useState(false);
  return (

      <li>
        <label>
          {props.label}
          <input type="checkbox" />
        </label>
      </li>
      
  );
}

function Dropdown(props) {
  const regions = [
    "Capital Region",
    "Central Maryland",
    "Eastern Shore",
    "Southern Maryland",
    "Western Maryland",
  ];
  const [labels, setLabels] = useState([]);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (props.category === "Region") {
      setLabels(regions);
    } else if (props.category === "City") {
      // labels = fetch("api/facets/city")
    } else if (props.category === "Type") {
      // labels = fetch("api/facets/type")
    } else if (props.category === "Amenities") {
      // labels = fetch("api/facets/amenities")
    }
  }, []);

  return (
    <div>
      {props.category}
      <ul>{labels.map((label) => (<Checkbox label={label} />))}</ul>
    </div>
  );
}

export default function Facets() {
  // use closure to pass state to view?

  // function updateFilters() {}

  return (
    <div className="Facets">
      <Dropdown category="Region" />
      <Dropdown category="City" />
      <Dropdown category="Type" />
      <Dropdown category="Amenities" />
    </div>
  );
}
