import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DetailsView() {
  const [details, setDetails] = useState(null);
  const id = useParams();
  useEffect(() => {
    fetch(`/api/attractions/${id}`).then((doc) => setDetails(doc));
  }, []);

  // then use data to fill in components and return;
  return (
    <p>
      Attraction: {id}, {details}
    </p>
  );
}
