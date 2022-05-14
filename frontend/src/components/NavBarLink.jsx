import React from "react";
import { NavLink } from "react-router-dom";

const NavBarLink = (props) => {
  return (
    <li className="group relative inline cursor-pointer">
      <div className="absolute bottom-0 h-0 w-full bg-gold duration-200 ease-out group-hover:h-full" />
      <NavLink
        className="flex h-full items-center justify-center bg-black px-6 text-xl text-gold duration-75 hover:ease-in group-hover:text-black"
        to={props.path}
      >
        <span className="-skew-x-[28deg]">{props.children}</span>
      </NavLink>
    </li>
  );
};

export default React.memo(NavBarLink);
