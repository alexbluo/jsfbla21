import axios from "axios";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import AccordionPreloader from "./AccordionPreloader";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const categories = ["region", "city", "category", "amenities"];

export default function Accordion() {
  const checkedFilters = useSelector((state) => state.filters);

  const { data, error, isLoading, isError } = useQuery(
    ["filters"],
    async () => {
      let results = {};
      
      // fetch the filters for each category and aggregate the results into an object
      for (const category of categories) {
        // res in the shape of { category: [filters] }
        const res = await axios.get(`/api/filters/${category}`);
        // append newly fetched data to previous data
        results = { ...results, ...res.data };
      }

      return results;
    }
  );

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div
      className={classNames(
        "flex flex-col gap-1 rounded-md border-4",
        { "border-transparent": isLoading },
        { "border-black bg-black": !isLoading }
      )}
    >
      {isLoading ? (
        <AccordionPreloader width="100%" height="220px" />
      ) : (
        // map each category to a dropdown and each filter to a checkbox within that dropdown
        Object.entries(data).map(([category, filters]) => (
          <Dropdown header={category.toUpperCase()} key={category}>
            {filters.map((filter) => (
              <Checkbox
                category={category}
                filter={filter}
                key={filter}
                checked={checkedFilters[category].includes(filter)}
              />
            ))}
          </Dropdown>
        ))
      )}
    </div>
  );
}
