import { useState } from "react";
import classNames from "classnames";
import arrow from "../images/arrow.png";

// headers which should be overflow-y: auto
const overflowHeaders = ["CITY", "CATEGORY", "AMENITY"];

const Dropdown = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <div
        className="flex h-14 w-full cursor-pointer select-none items-center justify-between rounded bg-gold px-4"
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className="font-raleway text-lg font-semibold">{props.header}</h2>
        <img
          className={classNames(
            "h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
            { "rotate-180": isOpened }
          )}
          src={arrow}
          alt=""
        />
      </div>
      <ul
        className={classNames(
          "mx-4 font-raleway text-base text-gold duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
          { "max-h-0": !isOpened },
          { "my-2 max-h-48": isOpened },
          {
            "overflow-y-auto": overflowHeaders.some(
              (header) => header === props.header
            ),
          },
          {
            "overflow-y-hidden": !overflowHeaders.some(
              (header) => header === props.header
            ),
          }
        )}
      >
        {props.children}
      </ul>
    </div>
  );
};

export default Dropdown;
