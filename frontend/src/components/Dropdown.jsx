import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Checkbox from "./Checkbox";
import dropdownIcon from "../images/dropdownIcon.png";

export default function Dropdown(props) {
  const [isOpened, setIsOpened] = useState(false);

  const { data, error, isLoading, isError } = useQuery(
    props.category,
    async () => {
      const res = await axios.get(`/api/facets/${props.category}`);
      return res.data; // data is returned to the "data" object
    }
  );

  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="bg-black">
      <div
        className="flex items-center p-3 rounded cursor-pointer select-none bg-gold"
        onClick={() => setIsOpened(!isOpened)}
      >
        <h2 className="text-lg text-black font-raleway">
          {props.category.toUpperCase()}
        </h2>
        <img
          className={`w-3 h-3 ml-2 transition-transform ${
            isOpened && "rotate-90"
          }`}
          src={dropdownIcon}
          alt=""
        />
      </div>
      <ul
        className={`${
          isOpened ? "max-h-48 my-4" : "max-h-0 overflow-hidden"
        } font-raleway text-base text-gold mx-4 overflow-y-auto duration-500 ease-[cubic-bezier(0.34, 1.56, 0.64, 1)]`}
      >
        {/* map fields that fall under the category to checkboxes */}
        {data[props.category].map((field, index) => (
          <Checkbox category={props.category} field={field} key={index} />
        ))}
      </ul>
    </div>
  );
}
