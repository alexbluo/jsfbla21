import { Link } from "react-router-dom";
import findFilter from "../helpers/findFilter";
import none from "../images/none.png";

const Preview = ({ data }) => {
  return (
    <div className="group relative font-poppins">
      <Link to={`/attractions/${data.attraction_id}`}>
        <img
          className="aspect-square w-full rounded-md object-cover shadow-md shadow-black duration-200 group-hover:shadow-none group-hover:brightness-50"
          src={
            data.attraction_image.includes("data")
              ? none
              : data.attraction_image
          }
          alt=""
        />
        <div className="absolute bottom-0 flex h-24 w-full flex-col rounded-md bg-black bg-opacity-90 p-4 text-center text-gold duration-200 group-hover:h-full group-hover:bg-transparent">
          <div className="my-auto truncate text-xl font-medium duration-200 group-hover:whitespace-normal">
            {data.attraction_name}
          </div>
          <span>{findFilter(data, "city")}</span>
        </div>
      </Link>
    </div>
  );
};

export default Preview;
