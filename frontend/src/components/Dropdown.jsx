import React, { useState } from "react";
import classNames from "classnames";
import arrow from "../images/arrow.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="bg-black">
      <div
        className="flex items-center justify-between p-3 rounded cursor-pointer select-none bg-gold"
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className="text-lg font-semibold font-raleway">
          {props.header}
        </h2>
        <img
          className={classNames(
            "w-6 h-6 duration-300 ease-out transition-transform",
            { "rotate-180": isOpened }
          )}
          src={arrow}
          alt=""
        />
      </div>
      {/* TODO: fetch in facets and map so that this can be reused in help page */}
      <ul
        className={classNames(
          "font-raleway text-base text-gold mx-4 overflow-y-auto duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]",
          { "max-h-48 my-4": isOpened },
          { "max-h-0": !isOpened }
        )}
      >
        {/* map fields that fall under the category to checkboxes */}
        {props.children}
      </ul>
    </div>
  );
}
