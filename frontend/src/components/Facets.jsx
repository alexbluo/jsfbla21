import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";

export const FacetsContext = React.createContext({
  facets: {},
  setFacets: () => {},
});

export default function Facets() {
  const [facets, setFacets] = useState({});
  const value = { facets, setFacets };

  useEffect(() => {
    fetchFacets("region");
    fetchFacets("city");
    fetchFacets("category");
    fetchFacets("amenity");
    
    async function fetchFacets(category) {
      const res = await axios.get(`/api/facets/${category}`);
      const facetsCopy = facets;
      // convert the data value from an array to an object and update facets
      facetsCopy[category] = res.data[category].reduce(
        (acc, curr) => ((acc[curr] = false), acc),
        {}
      );
      setFacets(facetsCopy); // maybe use... smthn else
    }
  }, [facets]);

  return (
    <div className="inline-block w-[27%]">
      <FacetsContext.Provider value={value}>
        <Dropdown category="region" />
        <Dropdown category="city" />
        <Dropdown category="category" />
        <Dropdown category="amenity" />
      </FacetsContext.Provider>
    </div>
  );
}
