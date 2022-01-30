import React from "react";
import { Link } from "react-router-dom";
import "../css/Preview.css";
import noImage from "../images/noImage.png";

export default function Preview(props /* replace with { key names }*/) {
  const data = props.data;
  // only pass in certain props later then refactor, keeping full data for dev now

  return (
    <div className="Preview">
      <div className={`Preview__col${props.col_id}`}>
        <Link to={`/attractions/${data.attraction_id}`}>
          <img
            src={
              data.attraction_image.includes("data")
                ? noImage
                : data.attraction_image
            }
            alt=""
          />
        </Link>
        <label className="Preview__city">
          {data.facets.find((obj) => obj.type === "city").val}
        </label>
        <br />
        <label>{data.attraction_name}</label>
      </div>
    </div>
  );
}
