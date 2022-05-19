import React from "react";
import classnames from "classnames";
import { NavLink } from "react-router-dom";

const NavBarLink = (props) => {
  return (
    <li className="group relative inline cursor-pointer">
      <div className="absolute bottom-0 -z-10 h-0 w-full transform bg-gold duration-200 ease-out group-hover:h-full" />
      {/* could just make my own active state using url params */}
      <NavLink
        className={({ isActive }) =>
          classnames(
            "flex h-full w-fit px-8 text-xl duration-100 ease-in group-hover:text-black",
            { "text-gold": !isActive },
            { "bg-gold text-black": isActive }
          )
        }
        to={props.path}
      >
        {/* TODO: make this actually cover all areas */}
        <span className="flex h-full -skew-x-[60deg] items-center">
          {props.children}
        </span>
      </NavLink>
    </li>
  );
};

export default React.memo(NavBarLink);
