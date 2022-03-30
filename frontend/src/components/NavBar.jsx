import React from "react";
import NavBarLink from "./NavBarLink";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-10 flex h-12 w-full flex-row-reverse bg-red">
      <ul className="flex self-center">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
}
