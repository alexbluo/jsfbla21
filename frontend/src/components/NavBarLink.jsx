import React from "react";
import { NavLink } from "react-router-dom";

const NavBarLink = (props) => {
  // TODO: before/after, block, gold, rotate, clip with z?
  return (
    <li className="group relative inline cursor-pointer">
      <div className="absolute bottom-0 -z-10 h-0 w-full bg-gold duration-200 ease-out group-hover:h-full"></div>
      <NavLink
        className="flex h-full items-center justify-center px-6 text-xl text-gold duration-75 hover:ease-in group-hover:text-black"
        to={props.path}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default React.memo(NavBarLink);
