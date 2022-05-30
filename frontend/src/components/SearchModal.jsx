import { useState } from "react";
import classnames from "classnames";
import SearchBar from "./SearchBar";

const SearchModal = ({ data, isOpen }) => {
  return (
    <div
      className={classnames(
        "fixed top-0 left-0 -z-50 flex h-screen w-screen items-center justify-center duration-300 ease-in-out",
        { "z-50 bg-black bg-opacity-50": isOpen }
      )}
    >
      <div
        className={classnames(
          "h-2/3 w-2/3 rounded-lg border-4 bg-gold p-8 duration-300 ease-in-out",
          { "scale-0": !isOpen },
          { "scale-100": isOpen }
        )}
      >
        <div className="flex h-fit gap-8">
          <SearchBar />
          <div className="">
            <button className="aspect-square h-full bg-black"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
