import React from "react";
import { Link } from "react-router-dom";
import findFacet from "../utils/findFacet";
import noImage from "../images/noImage.png";

export default function Preview(props) {
  const data = props.data;

  return (
    <div className="group relative">
      <Link to={`/attractions/${data.attraction_id}`}>
        <img
          className="aspect-square w-full rounded-3xl object-cover shadow-md shadow-black duration-200 group-hover:brightness-50"
          src={
            data.attraction_image.includes("data")
              ? noImage
              : data.attraction_image
          }
          alt=""
        />
        <div className="absolute bottom-0 w-full rounded-3xl bg-black bg-opacity-90 p-4 text-center text-gold duration-200 group-hover:bg-transparent">
          <span className="block text-lg font-medium">
            {data.attraction_name}
          </span>
          <span className="">{findFacet(data, "city")}</span>
        </div>
      </Link>
    </div>
  );
}
