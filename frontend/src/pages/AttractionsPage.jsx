import React, { useState, useReducer, useMemo } from "react";
import qs from "qs";
import Facets from "../components/Facets";
import PreviewList from "../components/PreviewList";
import NavBar from "../components/NavBar";

// query param string to be passed up from child checkboxes
export const QueryParamContext = React.createContext();

// TODO: move
const initialState = {
  region: [],
  city: [],
  category: [],
  amenity: [],
};

function reducer(state, action) {
  const { type, payload } = action;
  const [category, field] = payload;

  switch (type) {
    // use of object instead of query string ensures consistent query key caching (string depends on order)
    // use of reducer allows for simply dispatching an action (less repeat in future feature)
    // the whole thing ultimately reduces code complexity and amibguity in both the frontend and backend
    // ^ write that down somewhere
    // !order does not matter when passing to useQuery
    case "ADD_PARAM":
      console.log("ADD_PARAM");

      return {...state };
    case "DEL_PARAM":
      console.log("DEL_PARAM");

      return state;
    default:
      return state;
  }
}

export default function AttractionsPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Attractions</h1>
        <div className="flex flex-col lg:flex-row gap-12">
          <QueryParamContext.Provider value={[ state, dispatch ]}>
            <Facets />
            <PreviewList />
          </QueryParamContext.Provider>
        </div>
      </div>
    </>
  );
}
