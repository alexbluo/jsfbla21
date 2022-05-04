import { useDispatch, useSelector } from "react-redux";
import FilterBlock from "./FilterBlock";

export default function FilterBlockList() {
  const storeFilters = useSelector((state) => state.filters);
  // console.log(filters);
  return (
    <div>
      {Object.entries(storeFilters).map(([category, filters]) =>
        filters.map((filter) => (
          <FilterBlock category={category} filter={filter} key={filter} />
        ))
      )}
    </div>
  );
}
