import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/DetailsPage.css";

export default function DetailsPage() {
  const [data, setData] = useState(null);
  const id = useParams().id;

  // fetches on every render, maybe use usecallback or usememo?
  useEffect(() => {
    fetch(`/api/attractions/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  return (
    <div className="DetailsPage container">
      <NavBar />
      {data ? (
        <div>
          <h1>{data.attraction_name}</h1>
          {data.attraction_image.includes("data") ? null : (
            <img id="DetailsPage__attraction-image" src={data.attraction_image} alt="" />
          )}
        </div>
      ) : null}
    </div>
  );
}
