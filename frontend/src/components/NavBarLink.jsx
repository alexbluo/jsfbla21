import { NavLink } from "react-router-dom";

const NavBarLink = (props) => {
  return (
    <li className="inline">
      <NavLink
        className="text-xl text-black duration-200 hover:text-gold hover:ease-in"
        to={props.path}
      >
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavBarLink;