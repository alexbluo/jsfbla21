import React from "react";
import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar__right">
        <ul>
          <li className="NavBar__item">
            <NavLink className="NavBar__link" to="/attractions">
              Attractions
            </NavLink>
          </li>
          <li className="NavBar__item">
            <NavLink className="NavBar__link" to="/map">
              Map
            </NavLink>
          </li>
          <li className="NavBar__item">
            <NavLink className="NavBar__link" to="/help">
              Help
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
