import React, { useContext, useEffect, useState } from "react";
import { QueryParamContext } from "../pages/AttractionsPage";
import encodeSpaces from "../utils/encodeSpaces";

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  const { queryParam, setQueryParam } = useContext(QueryParamContext);

  useEffect(() => {
    const param = `${encodeSpaces(props.field)}=${props.category}`;
    if (checked) {
      setQueryParam(`${queryParam}&${param}`);
    } else {
      // maybe try checking if queryparam includes param..?
      setQueryParam(queryParam.replace(`&${param}`, ""));
    }
  }, [checked]);

  return (
    <li>
      <label className="inline-flex items-center justify-center text-lg">
        <input
          className="mr-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border-2 bg-white transition-colors checked:bg-gold"
          type="checkbox"
          onChange={(event) => setChecked(event.target.checked)}
        />
        <span>{props.field}</span>
      </label>
    </li>
  );
}
