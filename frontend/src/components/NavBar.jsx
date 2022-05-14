import React, { useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  const [lastY, setLastY] = useState(window.scrollY);
  const [hide, setBlur] = useState(false);

  const handleScroll = useCallback(() => {
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
        {
          "-translate-y-full": hide,
        }
      )}
    >
      <ul className="mr-4 flex h-full skew-x-[28deg] border-x-gold">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
};

export default React.memo(NavBar);
