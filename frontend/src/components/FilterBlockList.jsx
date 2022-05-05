import { useDispatch, useSelector } from "react-redux";
import FilterBlock from "./FilterBlock";

export default function FilterBlockList() {
  const storeFilters = useSelector((state) => state.filters);

  return (
    <div className="my-1 flex flex-wrap gap-1">
      {/* {Object.entries(storeFilters).map(([category, filters]) =>
        filters.map((filter) => (
          <FilterBlock category={category} filter={filter} key={filter} />
        ))
      )} */}
      <FilterBlock
        category={"test"}
        filter={
          "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
        }
      />
    </div>
  );
}
