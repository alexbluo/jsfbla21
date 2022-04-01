import { useState, useEffect, useContext } from "react";
import { QueryParamContext } from "../pages/AttractionsPage";

export default function Checkbox(props) {
  const [queryParam, dispatch] = useContext(QueryParamContext);
  const [checked, setChecked] = useState(false);

  // TODO: fix firing hundreds of times on render (maybe use some special hook?)
  useEffect(() => {
    if (checked) {
      dispatch({ type: "ADD_PARAM", payload: [props.category, props.field] });
    } else {
      dispatch({ type: "DEL_PARAM", payload: [props.category, props.field] });
    }
  }, [checked]);

  return (
    <li>
      <label className="inline-flex w-full items-center truncate text-lg">
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
