import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/DetailsPage.css";

export default function DetailsPage() {
  const [data, setData] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    fetch(`/api/attractions/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log("fetch woofwoof");
  }, [id]);

  return (
    <div className="DetailsPage container">
      <NavBar />
      {data ? ( // check if fetch is complete
        <div>
          <h1>{data.attraction_name}</h1>
          <div className="DetailsPage__grid-container">
            <div className="DetailsPage__description"></div>
            {data.attraction_image.includes("data") ? null : (
              <img
                className="DetailsPage__attraction-image"
                src={data.attraction_image}
                alt=""
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
