import React from "react";
import "../css/ButtonLink.css"

export default function ButtonLink(props) {
  return (
    <a href={props.link}>
      <button className="ButtonLink">{props.children}</button>
    </a>
  );
}