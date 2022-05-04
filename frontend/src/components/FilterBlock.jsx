import { useDispatch } from "react-redux";
import { remove } from "../redux/filtersSlice";

export default function FilterBlock(props) {
  const dispatch = useDispatch();

  return (
    <button
      className="bg-gold text-black"
      onClick={dispatch(remove({ category: props.category, }))}
    >
      {props.filter}
    </button>
  );
}
