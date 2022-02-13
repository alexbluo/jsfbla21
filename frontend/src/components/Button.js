import React from "react";
import "../css/Button.css"

export default function Button(props) {
  return (
    <a href={props.link}>
      <button className="Button">{props.text}</button>
    </a>
  );
}