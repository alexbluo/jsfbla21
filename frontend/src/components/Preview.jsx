import React from "react";
import { Link } from "react-router-dom";
import "../css/Preview.css";
import findFacet from "../utils/findFacet";
import noImage from "../images/noImage.png";

export default function Preview(props /* replace with { key names }*/) {
  const data = props.data;
  // only pass in necessary props later then refactor, keeping full data for dev now

  return (
    <div className="">
      <Link to={`/attractions/${data.attraction_id}`}>
        <img
          className="object-cover w-full duration-200 shadow-md shadow-black rounded-3xl aspect-square hover:brightness-50"
          src={
            data.attraction_image.includes("data")
              ? noImage
              : data.attraction_image
          }
          alt=""
        />
        <div className="">
          <label className="">{findFacet(data, "city")}</label>
          <br />
          <label className="">
            <b>{data.attraction_name}</b>
          </label>
        </div>
      </Link>
    </div>
  );
}
