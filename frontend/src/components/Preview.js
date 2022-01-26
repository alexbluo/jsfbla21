import React from "react";
import { Link } from "react-router-dom";
import "../css/index.css"

export default function Preview(props) {
  const data = props.data;
  // only pass in certain props later then refactor, keeping full data for dev now
  
  return (
    <div>
      <Link to={`/attractions/${data.attraction_id}`}>
        {data.attraction_image ? (
          <img src={data.attraction_image} />
        ) : (
          <p>No Image Available</p>
        )}
      </Link>
      <label>{data.facets.city}</label>
    </div>
  );
}
