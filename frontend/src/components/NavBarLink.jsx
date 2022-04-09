import { NavLink } from "react-router-dom";

export default function NavBarLink(props) {
  return (
    <li className="inline">
      <NavLink
        className="text-xl text-white duration-200 hover:text-gold hover:ease-in"
        to={props.path}
      >
        {props.children}
      </NavLink>
    </li>
  );
}
