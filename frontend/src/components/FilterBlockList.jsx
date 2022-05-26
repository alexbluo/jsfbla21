import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { remove, reset } from "../redux/filtersSlice";
import FilterBlock from "./FilterBlock";

const FilterBlockList = () => {
  const storeFilters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <div className="my-1 flex flex-wrap gap-1">
      {Object.values(storeFilters).some((filter) => filter.length > 0) && (
        <FilterBlock onClick={() => dispatch(reset())} clearAll>
          Clear All
        </FilterBlock>
      )}

      {Object.entries(storeFilters).map(([category, filters]) =>
        filters.map((filter) => (
          <FilterBlock
            onClick={() => dispatch(remove({ category, filter }))}
            key={filter}
          >
            {filter}
          </FilterBlock>
        ))
      )}
    </div>
  );
};

export default FilterBlockList;
