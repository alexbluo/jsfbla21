import React from "react";
import { Link } from "react-router-dom";

export default function AttractionPreview(props) {
  <div>
    <Link to={`/attractions/${props.details.attraction_id}`}>
      <img src={props.details.attraction_image} alt=""></img>
    </Link>
    {/* ::after props.details.facets.city or something like that*/}
  </div>;
  
}
