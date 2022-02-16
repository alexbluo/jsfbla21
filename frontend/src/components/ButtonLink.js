import React from "react";
import "../css/ButtonLink.css";

export default function ButtonLink(props) {
  return (
    <a href={props.link}>
      <button
        className={`ButtonLink ${
          props.detail ? "ButtonLink--style-details" : null
        }`}
      >
        {props.children}
      </button>
    </a>
  );
}
