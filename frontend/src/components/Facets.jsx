import { useQuery } from "react-query";
import axios from "axios";
import Dropdown from "./Dropdown";
import Checkbox from "./Checkbox";
import FacetsPreloader from "./FacetsPreloader";

const categories = ["region", "city", "category", "amenity"];

export default function Facets() {
  const { data, error, isLoading, isError } = useQuery(["facets"], async () => {
    let data = {};

    for (const category of categories) {
      // res in the form of { category: [fields] }
      const res = await axios.get(`/api/facets/${category}`);
      // append newly fetched data to previous data
      data = { ...data, ...res.data };
    }

    return data;
  });

  if (isLoading) return <FacetsPreloader />;
  if (isError) return <span>Error: {error.message}</span>;
  return (
    <div className="inline-block">
      <div className="flex flex-col gap-1 rounded-md border-4 bg-black">
        {Object.entries(data).map(([category, fields], index) => (
          <Dropdown header={category.toUpperCase()} key={index}>
            {fields.map((field, index) => (
              <Checkbox category={category} field={field} key={index} />
            ))}
          </Dropdown>
        ))}
      </div>
    </div>
  );
}
