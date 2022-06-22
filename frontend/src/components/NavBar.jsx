import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import NavBarLink from "./NavBarLink";

export default React.memo(() => {
  const [blur, setBlur] = useState(false);
  const [lastY, setLastY] = useState(window.scrollY);

  const handleScroll = useCallback(() => {
    // blur the navbar if the user is scrolling down
    setBlur(window.scrollY > lastY && window.scrollY > 64);
    setLastY(window.scrollY);
  }, [lastY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <nav
      className={classNames(
        "fixed top-0 left-0 z-10 flex h-16 w-screen justify-end border-b border-gold bg-black font-raleway font-semibold duration-200 ease-out sm:justify-between",
        {
          "border-opacity-60 bg-opacity-60 backdrop-blur backdrop-filter": blur,
        }
      )}
    >
      <header className="hidden sm:block">
        <NavLink to="/">
          <h1 className=" h-full w-fit skew-x-[60deg] bg-gold px-12 text-xl">
            <span className="flex h-full -skew-x-[60deg] items-center text-center text-2xl">
              Maryland Attractions
            </span>
          </h1>
        </NavLink>
      </header>
      <ul className="mr-4 flex h-full skew-x-[60deg]">
        <NavBarLink to="/">Attractions</NavBarLink>
        <NavBarLink to="/map">Map</NavBarLink>
        <NavBarLink to="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
});
