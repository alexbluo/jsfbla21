import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import Map from "../components/Map";
import none from "../images/none.png";
import findFilter from "../utils/findFilter";

const DetailsPage = () => {
  const id = useParams().id;

  const { data, error, isLoading, isError } = useQuery(
    ["attraction", id],
    async () => {
      const res = await axios.get(`/api/attractions/${id}`);
      return res.data;
    }
  );

  /**
   * Formats the amenities array into html that can be dangerously set
   * @returns the dangerouslySetInnerHTML object
   */
  const createAmenitiesMarkup = () => {
    const amenities = `<ul class="w-full indent-4 truncate"><li>${data.amenities.join(
      "</li><li>"
    )}</li></ul>`;
    return { __html: amenities };
  };

  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex flex-col">
      <h1 className="page-title">{data.attraction_name}</h1>
      <div className="grid grid-rows-6 font-poppins lg:grid-cols-3 lg:grid-rows-2">
        {/* description */}
        <div className="flex aspect-square flex-col overflow-y-auto bg-gold px-[8%] py-[4%]">
          <h2 className="mb-2 text-2xl">Description</h2>
          {data.description}
        </div>

        {/* website and contact via button links */}
        <div className="flex flex-col bg-red px-[8%] py-[4%] text-white">
          <h2 className="mb-2 text-2xl">Website & Contact</h2>
          <div className="grid h-full grid-cols-2 grid-rows-4 gap-4 text-center">
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

        {/* image from preview */}
        <img
          className="aspect-square w-full object-fill"
          src={
            data.attraction_image.includes("data") // null images include the word "data" in their URI
              ? none
              : data.attraction_image
          }
          alt=""
        />

        {/* amenities */}
        <div className="flex w-auto flex-col bg-red px-[8%] py-[4%] text-white">
          <h2 className="mb-2 text-2xl">Amenities</h2>
          {data.amenities ? (
            <div dangerouslySetInnerHTML={createAmenitiesMarkup()}></div>
          ) : (
            <p>No amenities listed</p>
          )}
        </div>

        {/* location */}
        <div className="flex flex-col bg-gold px-[8%] py-[4%]">
          <h2 className="mb-2 text-2xl">Location</h2>
          {data.address}
          <br />
          {findFilter(data, "city")}, {data.state}&nbsp;
          {data.zip}
          <br />
          <a
            className="text-white underline decoration-red decoration-4 underline-offset-4 duration-200 ease-in hover:text-red"
            href={data.directions_link}
          >
            Directions
          </a>
        </div>

        {/* region */}
        <div className="bg-red px-[8%] py-[4%] text-white">
          <h2 className="mb-2 text-2xl">Region</h2>
          <h3 className="text-lg">{findFilter(data, "region")}</h3>
          {data.region_image && (
            <img className="w-full" src={data.region_image} alt="" />
          )}
        </div>
      </div>
      <Map
        center={{ lat: data.coordinates[1], lng: data.coordinates[0] }}
        centerName={`${data.attraction_name} (current)`}
      />
    </div>
  );
};

export default DetailsPage;
