import { useState, useEffect, useCallback } from "react";
import NavBarLink from "./NavBarLink";

const NavBar = () => {
  const [lastY, setLastY] = useState(window.scrollY);
  const [blurNav, setBlurNav] = useState(false);

  const handleScroll = () => {
    // console.log("window.scrollY: " + window.scrollY);
    // console.log("lastY:" + lastY);
    if (window.scrollY > lastY) {
      // setBlurNav(true);
      console.log("down");
    } else {
      // setBlurNav(false)
      console.log("up");
    }
    setLastY(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastY]);

  return (
    <nav className="fixed top-0 left-0 z-10 flex h-12 w-screen flex-row-reverse bg-gold">
      <ul className="flex gap-4 self-center pr-8">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
};
export default NavBar;
