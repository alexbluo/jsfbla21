import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ButtonLink from "../components/ButtonLink";
import DetailSection from "../components/DetailSection";
import Map from "../components/Map";
import none from "../images/none.png";

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
   * @returns the html for amenities
   */
  const createAmenitiesMarkup = () => {
    if (!data.amenities) return { __html: "<li>No amenities listed</li>" };

    const amenities = `<li>- ${data.amenities.join("</li><li>- ")}</li>`;

    return { __html: amenities };
  };

  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="flex flex-col">
      <h1 className="page-title">{data.attraction_name}</h1>
      <div className="grid grid-rows-6 font-poppins lg:grid-cols-3 lg:grid-rows-2">
        {/* description */}
        <DetailSection header="Description" order="odd">
          {data.description}
        </DetailSection>

        {/* website and contact via button links */}
        <DetailSection header="Website & Contact" order="even">
          <div className="grid grid-cols-2 gap-4 text-center">
            <ButtonLink link={data.website_link}>Website</ButtonLink>
            <ButtonLink link={data.mailto_link}>Email</ButtonLink>
            <ButtonLink link={data.phone_number}>
              Phone
              <br />
              {data.phone_number}
            </ButtonLink>
            <ButtonLink link={data.fax}>
              Fax
              <br />
              {data.fax}
            </ButtonLink>
          </div>
        </DetailSection>

        {/* image from preview */}
        <img
          className="aspect-square w-full object-fill"
          src={
            !data.attraction_image || data.attraction_image.includes("data") // empty placeholder images are base64 encoded
              ? none
              : data.attraction_image
          }
          alt=""
        />

        {/* amenities */}
        <DetailSection header="Amenities" order="even">
          <ul dangerouslySetInnerHTML={createAmenitiesMarkup()}></ul>
        </DetailSection>

        {/* location */}
        <DetailSection header="Location" order="odd">
          {data.address}
          <br />
          {data.city}, {data.state}&nbsp;
          {data.zip}
          <br />
          <a
            className="text-white underline decoration-red decoration-4 underline-offset-4 duration-200 ease-in hover:text-red"
            href={data.directions_link}
          >
            Directions
          </a>
        </DetailSection>

        {/* region */}
        <DetailSection header="Region" order="even">
          <h3 className="text-lg">{data.region}</h3>
          {data.region_image && (
            <img
              className="w-full"
              src={data.region_image}
              alt={`${data.region_name} image`}
            />
          )}
        </DetailSection>
      </div>
      <Map
        center={{
          lat: data.location.coordinates[1],
          lng: data.location.coordinates[0],
        }}
        centerName={`${data.attraction_name} (current)`}
      />
    </div>
  );
};

export default DetailsPage;
