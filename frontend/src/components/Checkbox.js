import React, { useState } from "react";
import "../css/Checkbox.css"

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  const label = props.label;

  return (
    <li className="Checkbox">
      <label>
        <input type="checkbox" onInput={() => setChecked(!checked)} />
        {label}
      </label>
    </li>
  );
}
