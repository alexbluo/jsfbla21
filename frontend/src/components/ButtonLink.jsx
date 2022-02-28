import React from "react";

export default function ButtonLink(props) {
  return (
    <a className="bl-container" href={props.link}>
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
