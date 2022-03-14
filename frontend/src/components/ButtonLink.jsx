import React from "react";

export default function ButtonLink(props) {
  return (
    <a
      className="flex justify-center w-full h-full"
      href={props.link}
    >
      <button className="whitespace-nowrap w-[90%] h-full text-white duration-200 rounded-md bg-red hover:brightness-75">
        {props.children}
      </button>
    </a>
  );
}
