import React from "react";
import { Link } from "react-router-dom";
import findFacet from "../utils/findFacet";
import Button from "./Button";
import "../css/Popup.css";

export default function Popup(props) {
  const data = props.data;

  return (
    <div className="Popup">
      <button className="Popup__close-button" onClick={props.onCloseClick}>
        X
      </button>
      <p className="Popup__title">{data.attraction_name}</p>
      <div className="Popup__contents-container">
        <img src={data.attraction_image} className="Popup__image" />

        <Button
          className="Popup__button"
          text="Website"
          link={data.website_link}
        ></Button>
        <Button
          className="Popup__button"
          text="Directions"
          link={data.directions_link}
        ></Button>
        <div className="Popup__text">
          <p className="Popup__address">
            {data.address}, <br /> {findFacet(data, "city")}, {data.state}{" "}
            {data.zip}
          </p>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
