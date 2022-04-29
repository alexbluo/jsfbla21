import { useDispatch } from "react-redux";
import { add, remove } from "../redux/filtersSlice";

export default function Checkbox(props) {
  const dispatch = useDispatch();

  function handleCheck(checked) {
    if (checked) {
      dispatch(add({ category: props.category, field: props.field }));
    } else {
      dispatch(remove({ category: props.category, field: props.field }));
    }
  }

  return (
    <li>
      <label className="inline-flex w-full items-center truncate text-lg">
        <input
          className="mr-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border-2 bg-white transition-colors checked:bg-gold"
          type="checkbox"
          onChange={(event) => handleCheck(event.target.checked)}
        />
        <span>{props.field}</span>
      </label>
    </li>
  );
}
