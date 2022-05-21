import { useDispatch } from "react-redux";
import { add, remove } from "../redux/filtersSlice";

const Checkbox = ({ category, filter, checked }) => {
  const dispatch = useDispatch();

  const handleCheck = (e) => {
    if (e.target.checked) {
      dispatch(add({ category: category, filter: filter }));
    } else {
      dispatch(remove({ category: category, filter: filter }));
    }
  };

  return (
    <li>
      <label className="inline-flex w-full items-center truncate text-lg">
        <input
          className="mr-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border-2 bg-black transition-colors checked:bg-gold"
          type="checkbox"
          onChange={(e) => handleCheck(e)}
          checked={checked}
        />
        {filter}
      </label>
    </li>
  );
};

export default Checkbox;
