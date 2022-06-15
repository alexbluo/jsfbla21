import { useState } from "react";
import classNames from "classnames";

function Dropdown({ header, children }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div>
      <button
        className="flex h-14 w-full cursor-pointer select-none items-center justify-between rounded bg-gold px-4"
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className="font-raleway text-lg font-semibold">{header}</h2>
        <svg
          className={classNames(
            "h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
            { "-rotate-180": isOpened }
          )}
          viewBox="0 0 16 16"
        >
          <path d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
        </svg>
      </button>
      <ul
        className={classNames(
          "mx-4 overflow-y-auto font-raleway text-base text-gold duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
          { "max-h-0": !isOpened },
          { "my-2 max-h-48": isOpened }
        )}
      >
        {children}
      </ul>
    </div>
  );
}

export default Dropdown;
