import React from "react";
import { Link } from "react-router-dom";
import findFacet from "../utils/findFacet";
import ButtonLink from "./ButtonLink";
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
        <ButtonLink className="Popup__button" link={data.website_link}>
          Website
        </ButtonLink>
        <ButtonLink className="Popup__button" link={data.directions_link}>
          Directions
        </ButtonLink>
        <div className="Popup__text">
          <p className="Popup__address">
            {data.address}
            <br />
            {findFacet(data, "city")}, {data.state}&nbsp;
            {data.zip}
          </p>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}
