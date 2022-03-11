import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";

const categories = ["region", "city", "category", "amenity"];

export default function Facets() {
  const _isMounted = useRef(true);
  const [facets, setFacets] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(async () => {
    for (const category of categories) {
      await fetchFacets(category);
    }

    async function fetchFacets(category) {
      const res = await axios.get(`/api/facets/${category}`);
      if (_isMounted.current) {
        setFacets((prev) => ({ ...prev, ...res.data }));
      }
    }
  }, []);

  useEffect(() => {
    const facetCategories = Object.keys(facets);
    // check if all facet categories have completed fetching
    if (categories.every((category) => facetCategories.includes(category))) {
      setLoading(false);
    }
  }, [facets]);

  return (
    <div className="inline-block w-[27%]">
      {!loading && (
        <div className="flex flex-col gap-1 bg-black border-4 rounded-md">
          {Object.entries(facets).map(([key, value], index) => (
            <Dropdown category={key} key={index}>
              {value.map((field, index) => (
                <Checkbox category={key} field={field} key={index} />
              ))}
            </Dropdown>
          ))}
        </div>
      )}
    </div>
  );
}
