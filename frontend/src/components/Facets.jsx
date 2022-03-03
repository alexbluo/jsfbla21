import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";

export default function Facets() {
  const _isMounted = useRef(true);
  const [facets, setFacets] = useState({});
  const [loading, setLoading] = useState(true);
  const categories = ["region", "city", "category", "amenity"];

  useEffect(() => {
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(async () => {
    for (const category of categories) {
      fetchFacets(category);
    }

    async function fetchFacets(category) {
      const res = await axios.get(`/api/facets/${category}`);
      if (_isMounted.current) {
        setFacets((previous) => ({ ...previous, ...res.data }));
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

  function renderDropdown() {
    return (
      !loading &&
      Object.entries(facets).map(([key, value], index) => (
        <Dropdown category={key} key={index}>
          {value.map((field, index) => (
            <Checkbox category={key} field={field} key={index} />
          ))}
        </Dropdown>
      ))
    );
  }
  return <div className="inline-block w-[27%]">{renderDropdown()}</div>;
}
