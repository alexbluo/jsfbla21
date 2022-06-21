import React from "react";
import { useDispatch } from "react-redux";
import { add, remove } from "../redux/filtersSlice";

export default React.memo(({ category, filter, checked }) => {
  const dispatch = useDispatch();

  // trigger redux action (add/remove filter), which causes preview list component to refetch
  const handleCheck = (e) => {
    if (e.target.checked) {
      dispatch(add({ category, filter }));
    } else {
      dispatch(remove({ category, filter }));
    }
  };

  return (
    <li className="flex w-full items-center truncate text-lg">
      <input
        className="mr-1 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-sm border-2 bg-black transition-colors checked:bg-gold"
        type="checkbox"
        onChange={handleCheck}
        checked={checked}
      />
      <span>{filter}</span>
    </li>
  );
});
