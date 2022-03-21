import { NavLink } from "react-router-dom";

export default function NavBarLink(props) {
    return (
        <li className="inline">
            <NavLink
                className="mx-3 text-xl text-white hover:duration-200 hover:ease-in hover:text-gold"
                to={props.path}
            >
                {props.children}
            </NavLink>
        </li>
    );
}
