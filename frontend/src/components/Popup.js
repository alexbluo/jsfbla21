import React from "react";
import { Link } from "react-router-dom";
import "../css/Popup.css";

export default function Popup(props) {
  return (
    <div className="Popup">
      <p className="Popup__title">{props.data.attraction_name}</p>
      <button className="Popup__close-button" onClick={props.onCloseClick}>
        X
      </button>
    </div>
  );
}
