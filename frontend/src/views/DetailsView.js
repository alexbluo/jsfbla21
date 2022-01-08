import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailsView() {
  const { attraction_id } = useParams();

  // fetch data with api call via separate express route, or could just make express directly route to this?'
  fetch();
  // then use data to fill in components and return;
  return <p>Attraction: {attraction_id}</p>;
}
