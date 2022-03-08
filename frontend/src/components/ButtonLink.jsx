import React from "react";

export default function ButtonLink(props) {
  return (
    <a className="" href={props.link}>
      <button className="">
        {props.children}
      </button>
    </a>
  );
}
