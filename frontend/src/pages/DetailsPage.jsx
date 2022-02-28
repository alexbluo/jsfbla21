import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import NavBar from "../components/NavBar";
import noImage from "../images/noImage.png";
import findFacet from "../utils/findFacet";

export default function DetailsPage() {
  const [data, setData] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    let isMounted = true;

    fetch(`/api/attractions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setData(data);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  /**
   * Formats the amenities array into html that can be dangerously set
   * @returns the dangerouslySetInnerHTML object
   */
  function createAmenitiesMarkup() {
    const amenities = `<ul class="DetailsPage__amenities-list"><li>${data.amenities.join(
      "</li><li>"
    )}</li></ul>`;
    return { __html: amenities };
  }

  return (
    <div className="container px-[8%] py-8">
      <NavBar />
      {data && (
        <div>
          <h1 className="text-4xl mb-4">{data.attraction_name}</h1>
          <div className="DetailsPage__grid-container">
            <div className="DetailsPage__description">
              <h2>Description</h2>
              {data.description}
            </div>

            <div className="DetailsPage__buttons">
              <h2>Website & Contact</h2>
              <div className="DetailsPage__buttons-grid">
                {data.website_link && (
                  <ButtonLink link={data.website_link} detail>
                    Website
                  </ButtonLink>
                )}
                {data.mailto_link && (
                  <ButtonLink link={data.mailto_link} detail>
                    Email
                  </ButtonLink>
                )}
                {data.phone_number && (
                  <ButtonLink link={`tel:${data.phone_number}`} detail>
                    Phone
                    <br />
                    {data.phone_number}
                  </ButtonLink>
                )}
                {data.fax && (
                  <ButtonLink link={`tel:${data.fax}`} detail>
                    Fax
                    <br />
                    {data.fax}
                  </ButtonLink>
                )}
              </div>
            </div>

            <img
              className="DetailsPage__attraction-image"
              src={
                data.attraction_image.includes("data")
                  ? noImage
                  : data.attraction_image
              }
              alt=""
            />

            <div className="DetailsPage__amenities">
              <h2>Amenities</h2>
              {data.amenities ? (
                <div dangerouslySetInnerHTML={createAmenitiesMarkup()}></div>
              ) : (
                <p>No amenities listed</p>
              )}
            </div>

            <div className="DetailsPage__location">
              <h2>Location</h2>
              {data.address}
              <br />
              {findFacet(data, "city")}, {data.state}&nbsp;
              {data.zip}
              <br />
              <a
                className="DetailsPage__directions-link"
                href={data.directions_link}
              >
                Directions
              </a>
            </div>

            <div className="DetailsPage__region">
              <h2>Region</h2>
              <h3>{findFacet(data, "region") && findFacet(data, "region")}</h3>
              {data.region_image && <img src={data.region_image} alt="" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
