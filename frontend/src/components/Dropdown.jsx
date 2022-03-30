import React, { useState } from "react";
import classNames from "classnames";
import arrow from "../images/arrow.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="bg-black">
      <div
        className="flex cursor-pointer select-none items-center justify-between rounded bg-gold p-3"
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className="font-raleway text-lg font-semibold">{props.header}</h2>
        <img
          className={classNames(
            "h-6 w-6 transition-transform duration-300 ease-out",
            { "rotate-180": isOpened }
          )}
          src={arrow}
          alt=""
        />
      </div>
      {/* TODO: fetch in facets and map so that this can be reused in help page */}
      <ul
        className={classNames(
          "ease-[cubic-bezier(0.34, 1.56, 0.64, 1)] mx-4 overflow-y-auto font-raleway text-base text-gold duration-500",
          { "my-4 max-h-48": isOpened },
          { "max-h-0": !isOpened }
        )}
      >
        {/* map fields that fall under the category to checkboxes */}
        {props.children}
      </ul>
    </div>
  );
}
