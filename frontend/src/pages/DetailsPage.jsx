import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import NavBar from "../components/NavBar";
import noImage from "../images/noImage.png";
import findFacet from "../utils/findFacet";

export default function DetailsPage() {
  const _isMounted = useRef(true);
  const [data, setData] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(async () => {
    const res = await axios.get(`/api/attractions/${id}`);

    if (_isMounted.current) setData(res.data);
  }, [id]);

  /**
   * Formats the amenities array into html that can be dangerously set
   * @returns the dangerouslySetInnerHTML object
   */
  function createAmenitiesMarkup() {
    const amenities = `<ul class="absolute max-w-[20%] max-h-[70%] ml-8 overflow-auto"><li>${data.amenities.join(
      "</li><li>"
    )}</li></ul>`;
    return { __html: amenities };
  }

  return (
    <div className="container px-[8%] pt-8 pb-16">
      <NavBar />
      {data && (
        <div>
          <h1 className="text-4xl mb-4">{data.attraction_name}</h1>
          <div className="grid grid-cols-3 grid-rows-2">
            <div className="px-[8%] py-[4%] bg-gold">
              <h2 className="text-2xl mb-2">Description</h2>
              {data.description}
            </div>

            <div className="px-[8%] py-[4%] text-red">
              <h2 className="text-2xl mb-2">Website & Contact</h2>
              <div className="grid grid-cols-2 gap-0 items-center bg-white text-center">
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
              className="w-full aspect-square object-fill"
              src={
                data.attraction_image.includes("data")
                  ? noImage
                  : data.attraction_image
              }
              alt=""
            />

            <div className="px-[8%] py-[4%] text-red">
              <h2 className="text-2xl mb-2">Amenities</h2>
              {data.amenities ? (
                <div dangerouslySetInnerHTML={createAmenitiesMarkup()}></div>
              ) : (
                <p>No amenities listed</p>
              )}
            </div>

            <div className="px-[8%] py-[4%] bg-gold">
              <h2 className="text-2xl mb-2">Location</h2>
              {data.address}
              <br />
              {findFacet(data, "city")}, {data.state}&nbsp;
              {data.zip}
              <br />
              <a
                className="text-white hover:text-red decoration-red decoration-4 underline underline-offset-4 duration-200 ease-in"
                href={data.directions_link}
              >
                Directions
              </a>
            </div>

            <div className="px-[8%] py-[4%] text-red">
              <h2 className="text-2xl mb-2">Region</h2>
              <h3 className="text-lg mb-2">
                {findFacet(data, "region") && findFacet(data, "region")}
              </h3>
              {data.region_image && <img src={data.region_image} alt="" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
