import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const NavBarLink = (props) => {
  return (
    <li className="group relative inline cursor-pointer">
      <div className="absolute bottom-0 h-0 w-full bg-gold duration-200 ease-out group-hover:h-full" />
      <NavLink
        className={({ isActive }) =>
          classnames(
            "flex h-full px-8 text-xl text-gold duration-100 ease-in group-hover:text-black",
            { "bg-gold text-black": isActive }
          )
        }
        to={props.path}
      >
        <span className="flex h-full -skew-x-[60deg] items-center">
          {props.children}
        </span>
      </NavLink>
    </li>
  );
};

export default React.memo(NavBarLink);
