import React from "react";
import ButtonLink from "./ButtonLink";
import noImage from "../images/noImage.png";
import findFacet from "../utils/findFacet";
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
        <img
          className="Popup__image"
          src={
            data.attraction_image.includes("data")
              ? noImage
              : data.attraction_image
          }
          alt=""
        />
        {data.website_link && (
          <ButtonLink className="Popup__button" link={data.website_link}>
            Website
          </ButtonLink>
        )}
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
