import React, { useState } from "react";
import "./styles.css"

// rough idea
function Checkbox() {
  // [isChecked, setIsChecked] = useState(false, () => !isChecked);
  return <input type="checkbox" />;
}
function FacetDropdown() {
  // somehow control what actual content is displayed here
  // prob move to separate file and make controller/model perform actions on certain db fields using
  return <p>dropdown</p>;
}

export default function Facets() {
  return (
    <div>
      <Checkbox />
      <FacetDropdown />
    </div>
  );
}
