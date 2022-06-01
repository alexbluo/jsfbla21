import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  const [hide, setBlur] = useState(false);
  const [lastY, setLastY] = useState(window.scrollY);

  const handleScroll = useCallback(() => {
    // blur the navbar if the user is scrolling down
    setBlur(window.scrollY > lastY && window.scrollY > 32);
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
      className={classnames(
        "fixed top-0 left-0 z-10 flex h-16 w-screen flex-row-reverse border-b border-gold bg-black duration-200 ease-out",
        { "-translate-y-full": hide }
      )}
    >
      <ul className="mr-4 flex h-full skew-x-[60deg] border-x-gold">
        <NavBarLink to="/attractions">Attractions</NavBarLink>
        <NavBarLink to="/map">Map</NavBarLink>
        <NavBarLink to="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
};

export default React.memo(NavBar);
