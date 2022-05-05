import { useDispatch } from "react-redux";
import { add, remove } from "../redux/filtersSlice";

const Checkbox = (props) => {
  const dispatch = useDispatch();

  const handleCheck = (checked) => {
    if (checked) {
      dispatch(add({ category: props.category, filter: props.filter }));
    } else {
      dispatch(remove({ category: props.category, filter: props.filter }));
    }
  }

  return (
    <li>
      <label className="inline-flex w-full items-center truncate text-lg">
        <input
          className="mr-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border-2 bg-black transition-colors checked:bg-gold"
          type="checkbox"
          onChange={(event) => handleCheck(event.target.checked)}
          checked={props.checked}
        />
        {props.filter}
      </label>
    </li>
  );
}

export default Checkbox;
