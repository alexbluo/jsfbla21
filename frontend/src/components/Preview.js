import React from "react";
import { Link } from "react-router-dom";
import "../css/Preview.css";

export default function Preview(props) {
  const data = props.data;
  // only pass in certain props later then refactor, keeping full data for dev now

  return (
    <div className="Preview">
      <Link to={`/attractions/${data.attraction_id}`}>
        {data.attraction_image ? (
          <img
            src={data.attraction_image} /*className={`col${props.col_id}`}*/
          />
        ) : (
          <p>No Image Available</p>
        )}
      </Link>
      <label>{data.facets.find((obj) => obj.type === "city").val}</label>
      <br />
      <label>{data.attraction_name}</label>
    </div>
  );
}
