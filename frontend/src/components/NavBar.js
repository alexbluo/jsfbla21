import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function NavBar() {
  return (
    <nav className="NavBar">
      <div className="NavBar__right">
        <ul className="NavBar__item-wrapper">
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/attractions">
              Attractions
            </Link>
          </li>
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/help">
              <img className="NavBar__help" src="../images/help.png" />
            </Link>
          </li>
          <li className="NavBar__item">
            <Link className="NavBar__link" to="/qna">
              Link 3
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
