import axios from "axios";
import classNames from "classnames";
import { useQuery } from "react-query";
import AccordionPreloader from "./AccordionPreloader";
import Checkbox from "./Checkbox";
import Dropdown from "./Dropdown";

const categories = ["region", "city", "category", "amenity"];

export default function Accordion() {
  const { data, error, isLoading, isError } = useQuery(
    ["filters"],
    async () => {
      let data = {};

      for (const category of categories) {
        // res in the form of { category: [fields] }
        const res = await axios.get(`/api/filters/${category}`);
        // append newly fetched data to previous data
        data = { ...data, ...res.data };
      }
      console.log(data);
      return data;
    }
  );

  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="inline-block w-full xl:w-1/3">
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
          Object.entries(data).map(([category, fields], index) => (
            <Dropdown header={category.toUpperCase()} key={index}>
              {fields.map((field, index) => (
                <Checkbox category={category} field={field} key={index} />
              ))}
            </Dropdown>
          ))
        )}
      </div>
    </div>
  );
}
