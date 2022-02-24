import React from "react";
import NavBarLink from "./NavBarLink";
import "../css/NavBar.css";

export default function NavBar() {
  return (
    <nav className="fixed left-0 top-0 z-10 flex flex-row-reverse h-12 w-full bg-red">
      <ul className="flex self-center">
        <NavBarLink path="/attractions">Attractions</NavBarLink>
        <NavBarLink path="/map">Map</NavBarLink>
        <NavBarLink path="/help">Help</NavBarLink>
      </ul>
    </nav>
  );
}
