import React from "react";
import { Link } from "react-router-dom";
import "../index.css"

export default function Preview(props) {
  const data = props.data;
  // only pass in certain props later then refactor, keeping full data for dev now
  
  return (
    <div>
      <Link to={`/attractions/${data.attraction_id}`}>
        {data.attraction_image ? (
          <img className="test" src={data.attraction_image} />
        ) : (
          <h3>No Image Available</h3>
        )}
      </Link>
      {/* ::after {data.facets.city} */}
    </div>
  );
}
