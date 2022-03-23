import React from "react";

export default function ButtonLink(props) {
  return (
    <a
      className="flex items-center justify-center w-full h-full"
      href={props.link}
    >
      <button className="w-full h-full text-white duration-200 rounded-md shadow-md whitespace-nowrap bg-red hover:brightness-75">
        {props.children}
      </button>
    </a>
  );
}
