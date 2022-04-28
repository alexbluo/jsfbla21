import { useReducer, createContext } from "react";
import Facets from "../components/Facets";
import NavBar from "../components/NavBar";
import PreviewList from "../components/PreviewList";

// state and dispatch are passed down to Checkbox and PreviewList via context API
export const QueryParamContext = createContext();

const initialState = {
  region: [],
  city: [],
  category: [],
  amenity: [],
};

// Checkbox dispatches action => state changes => reflected in PreviewList by querying
function reducer(state, action) {
  const { type, payload } = action;
  const [category, field] = payload;

  switch (type) {
    case "ADD_PARAM":
      state[category].push(field);
      return { ...state };
    case "DEL_PARAM":
      return {
        ...state,
        [category]: state[category].filter((em) => em != field),
      };
    case "RESET":
      return initialState;
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
        <div className="flex w-full flex-col gap-12 xl:flex-row">
          <QueryParamContext.Provider value={[state, dispatch]}>
            <Facets />
            <PreviewList />
          </QueryParamContext.Provider>
        </div>
      </div>
    </>
  );
}
