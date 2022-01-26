import React from "react";
import { Link } from "react-router-dom";
import "../css/NavBar.css"

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar__right">
        <ul>
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/attractions">
              Attractions
            </Link>
          </li>
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/map">
              Map
            </Link>
          </li>
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/help">
              Help
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
