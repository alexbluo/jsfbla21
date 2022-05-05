import { useDispatch } from "react-redux";
import { remove } from "../redux/filtersSlice";

export default function FilterBlock(props) {
  const dispatch = useDispatch();

  return (
    <div className="flex h-16 gap-1 rounded-md border-4 bg-black">
      <div
        className="flex items-center rounded-l bg-gold px-4 font-raleway text-lg focus:brightness-90"
        type="text"
        onChange={(e) => setText(e.target.value)}
      >
        {props.filter}
      </div>
      <button
        className="group aspect-square h-full rounded-r text-gold duration-200 hover:bg-gold active:brightness-50"
        onClick={() =>
          dispatch(remove({ category: props.category, filter: props.filter }))
        }
      >
        <svg
          className="mx-auto h-1/2 w-1/2 fill-gold duration-200 group-hover:fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
          <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
        </svg>
      </button>
    </div>
  );
}
