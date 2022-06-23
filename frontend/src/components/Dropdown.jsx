import { useState } from "react";
import classNames from "classnames";

// TODO: typography, import all font weights
export default function Dropdown({ header, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex min-h-[3.5rem] w-full cursor-pointer select-none items-center justify-between rounded bg-gold px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-montserrat text-lg font-medium">{header}</h2>
        <svg
          className={classNames(
            "h-6 w-6 shrink-0 transition-transform duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
            { "-rotate-180": isOpen }
          )}
          viewBox="0 0 16 16"
        >
          <path d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z" />
        </svg>
      </button>
      <ul
        className={classNames(
          "mx-4 overflow-y-auto font-poppins font-light text-gold duration-500 ease-[cubic-bezier(.84,-0.08,.16,1.08)]",
          { "max-h-0": !isOpen },
          { "my-2 max-h-48": isOpen }
        )}
      >
        {children}
      </ul>
    </div>
  );
}
