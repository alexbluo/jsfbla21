import React from "react";
import { Link } from "react-router-dom";

export default function Preview(props) {
  const data = props.data;
  return (
    <div>
      <Link to={`/attractions/${data.attraction_id}`}>
        <img src={data.attraction_image} alt="No Image Available for This Site"></img>
      </Link>
      {/* ::after props.details.facets.city or something like that*/}
    </div>
  );
}
