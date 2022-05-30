import { useState } from "react";
import classnames from "classnames";

const SearchModal = ({ isOpen, children }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  return (
    <div
      className={classnames(
        "fixed top-0 left-0 -z-50 flex h-screen w-screen items-center justify-center",
        { "z-50 bg-black bg-opacity-50": isOpen }
      )}
    >
      <div
        className={classnames(
          "w-2/3 h-2/3 rounded-lg border-4 bg-gold p-8 duration-300 ease-in-out",
          { "scale-0": !isOpen },
          { "scale-100": isOpen }
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SearchModal;
