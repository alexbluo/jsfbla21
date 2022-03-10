import React, { useContext, useEffect, useState } from "react";
import { QueryParamContext } from "../pages/AttractionsPage";
import encodeSpaces from "../utils/encodeSpaces";

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  const { queryParam, setQueryParam } = useContext(QueryParamContext);

  useEffect(() => {
    const param = `${encodeSpaces(props.field)}=${props.category}`; // could replace with querystring library
    if (checked) {
      setQueryParam(`${queryParam}&${param}`);
    } else {
      // maybe try checking if queryparam includes param..?
      setQueryParam(queryParam.replace(`&${param}`, ""));
    }
  }, [checked]);

  return (
    <li>
      <label className="inline-flex items-center text-lg hover:backdrop-brightness-150">
        <input
          className="flex-shrink-0 w-4 h-4 mr-1 cursor-pointer"
          type="checkbox"
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span>{props.field}</span>
      </label>
    </li>
  );
}
