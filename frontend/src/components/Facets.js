import React, { useEffect, useState } from "react";
import "../index.css";

// rough idea
function Checkbox(props) {
  // [isChecked, setIsChecked] = useState(false);
  return (
    <label>

      <input type="checkbox" />
    </label>
  );
}

function Dropdown(props) {
  const regions = ["Capital Region", "Central Maryland", "Eastern Shore", "Southern Maryland", "Western Maryland"];
  // dont actually handle like above, probably have to use state and get more data?
  // somehow control what actual content is displayed here
  // prob move to separate file and make controller/model perform actions on certain db fields using
  // useEffect(() => {
  //   if (props.category === "Region") {
  //     for (const region of regions) {
        
  //     }
  //   } else if (props.category === "City") {

  //   } else if (props.category === "Type") {

  //   } else if (props.category === "Amenities") {
      
  //   }
  // }, [])
  return (
    <div>
      <p>{props.category}</p>
      <Checkbox />
    </div>
  );
}

export default function Facets() {
  // use closure to pass state to view?

  return (
    <div className="dropdown">
      <Dropdown category="Region" />
      <Dropdown category="City" />
      <Dropdown category="Type" />
      <Dropdown category="Amenities" />
    </div>
  );
}
