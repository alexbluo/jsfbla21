import { Link } from "react-router-dom";
import none from "../images/none.png";

export default function Preview({
  attraction_id,
  attraction_name,
  attraction_image,
  city,
}) {
  return (
    <div className="group relative font-poppins">
      <Link to={`/attractions/${attraction_id}`}>
        <img
          className="aspect-square w-full rounded-md object-cover shadow-md shadow-black duration-200 group-hover:shadow-none group-hover:brightness-50"
          src={
            !attraction_image || attraction_image.includes("data")
              ? none
              : attraction_image
          }
          alt=""
        />
        <div className="absolute bottom-0 flex h-24 w-full flex-col rounded-md bg-black bg-opacity-90 p-4 text-center text-gold duration-200 group-hover:h-full group-hover:bg-transparent">
          <span className="my-auto truncate text-xl font-medium duration-200 group-hover:whitespace-normal">
            {attraction_name}
          </span>
          <span>{city}</span>
        </div>
      </Link>
    </div>
  );
}
