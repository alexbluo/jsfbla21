import axios from "axios";
import classNames from "classnames";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import AccordionPreloader from "./AccordionPreloader";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const categories = ["region", "city", "category", "amenities"];

const Accordion = () => {
  const checkedFilters = useSelector((state) => state.filters);

  const { data, error, isLoading, isError } = useQuery(
    ["filters"],
    async () => {
      let data = {};

      // fetch the filters for each category
      for (const category of categories) {
        // res in the form of { category: [filters] }
        const res = await axios.get(`/api/filters/${category}`);
        // append newly fetched data to previous data
        data = { ...data, ...res.data };
      }

      return data;
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
};

export default Accordion;
