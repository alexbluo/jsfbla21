import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";

const categories = ["region", "city", "category", "amenity"];

async function fetchFacets() {
  let data = {};

  for (const category of categories) {
    // res in the form of { category: [fields] }
    const res = await axios.get(`/api/facets/${category}`);
    // append newly fetched data
    data = { ...data, ...res.data };
  }

  return data;
}

export default function Facets() {
  const { data, error, isLoading, isError } = useQuery(["facets"], fetchFacets);

  //TODO: truncate long dropdown fields
  if (isLoading) return null;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="inline-block w-full lg:w-auto">
      <div className="flex flex-col gap-1 rounded-md border-4 bg-black">
        {Object.entries(data).map(([category, fields], index) => (
          <Dropdown header={category.toUpperCase()} key={index}>
            {fields.map((field, index) => (
              <Checkbox category={category} field={field} key={index} />
            ))}
          </Dropdown>
        ))}
      </div>
    </div>
  );
}
