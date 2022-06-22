import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
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
        "fixed top-0 left-0 z-10 flex h-16 w-screen flex-row-reverse border-b border-gold bg-black duration-200 ease-out",
        {
          "border-opacity-60 bg-opacity-60 backdrop-blur backdrop-filter": blur,
        }
      )}
    >
      <ul className="mr-4 flex h-full skew-x-[60deg] border-x-gold">
        <NavBarLink to="/">Attractions</NavBarLink>
        <NavBarLink to="/map">Map</NavBarLink>
        <NavBarLink to="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
});
