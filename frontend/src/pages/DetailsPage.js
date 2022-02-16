import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import NavBar from "../components/NavBar";
import "../css/DetailsPage.css";
import noImage from "../images/noImage.png";

export default function DetailsPage() {
  const [data, setData] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    fetch(`/api/attractions/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  function createAmenitiesMarkup() {
    const amenities = data.amenities.join("<br />"); // format into html
    return { __html: amenities };
  }
  return (
    <div className="DetailsPage container">
      <NavBar />
      {data ? (
        <div>
          <h1>{data.attraction_name}</h1>
          <div className="DetailsPage__grid-container">
            <div className="DetailsPage__description">
              <h2>Description</h2>
              {data.description}
            </div>
            <div className="DetailsPage__buttons">
              <h2>Website & Contact</h2>
              <div className="DetailsPage__buttons--grid">
                {data.website_link ? (
                  <ButtonLink link={data.website_link} detail>
                    Website
                  </ButtonLink>
                ) : null}
                {data.mailto_link ? (
                  <ButtonLink link={data.mailto_link} detail>
                    Email
                  </ButtonLink>
                ) : null}
                {data.phone_number ? (
                  <ButtonLink link={`tel:${data.phone_number}`} detail>
                    Phone
                    <br />
                    {data.phone_number}
                  </ButtonLink>
                ) : null}
                {data.fax ? (
                  <ButtonLink link={`tel:${data.fax}`} detail>
                    Fax
                    <br />
                    {data.fax}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
            {data.attraction_image.includes("data") ? (
              noImage
            ) : (
              <img
                className="DetailsPage__attraction-image"
                src={data.attraction_image}
                alt=""
              />
            )}
            {data.amenities ? (
              <div className="DetailsPage__amenities">
                <h2>Amenities</h2>  
                <div dangerouslySetInnerHTML={createAmenitiesMarkup()}></div>
              </div>
            ) : (
              <p>No Amenities Listed</p>
            )}
            <div className="DetailsPage__location"></div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
