import { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  // TODO: add active
  const [lastY, setLastY] = useState(window.scrollY);
  const [blur, setBlur] = useState(false);

  const handleScroll = useCallback(() => {
    setBlur(window.scrollY > lastY);
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
    <nav className="fixed top-0 left-0 z-10 flex h-16 w-screen flex-row-reverse border-b-2 border-gold border-opacity-80 bg-black">
      <ul className="flex h-full self-center pr-8">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
};

export default NavBar;
