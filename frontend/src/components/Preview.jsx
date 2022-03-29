import React from "react";
import { Link } from "react-router-dom";
import findFacet from "../utils/findFacet";
import noImage from "../images/noImage.png";

export default function Preview(props) {
  const data = props.data;

  return (
    <div className="relative group">
      <Link to={`/attractions/${data.attraction_id}`}>
        <img
          className="object-cover w-full duration-200 shadow-md shadow-black rounded-3xl aspect-square group-hover:brightness-50"
          src={
            data.attraction_image.includes("data")
              ? noImage
              : data.attraction_image
          }
          alt=""
        />
        <div className="absolute bottom-0 w-full p-4 text-center duration-200 bg-black bg-opacity-90 rounded-3xl text-gold group-hover:bg-transparent">
          <span className="block">
            <b>{data.attraction_name}</b>
          </span>
          <span className="">{findFacet(data, "city")}</span>
        </div>
      </Link>
    </div>
  );
}
