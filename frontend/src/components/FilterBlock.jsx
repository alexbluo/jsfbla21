import classnames from "classnames";
// TODO: clean up internal mongodb naming (facets => filters and typos)
// TODO: but first check if separate facets property in documents is even needed, if not maybe rescrape or do fancy mongodb stuff
// TODO: make fulltext search thing actually work

const FilterBlock = ({ onClick, clearAll, children }) => {
  return (
    <div
      className={classnames(
        "flex h-16 max-w-full gap-1 rounded-md border-4 bg-black",
        { "xl:w-full": clearAll }
      )}
    >
      <div
        className={classnames(
          "min-w-fit overflow-hidden rounded-l bg-gold px-4 font-raleway text-lg focus:brightness-90",
          { "xl:w-1/2": clearAll }
        )}
        type="text"
      >
        <span className="flex h-full items-center truncate justify-center">{children}</span>
      </div>
      <button
        className={classnames(
          "group aspect-square h-full rounded-r text-gold duration-150 ease-in-out hover:bg-gold active:brightness-75",
          { "xl:w-1/2": clearAll }
        )}
        onClick={onClick}
      >
        <svg
          className="mx-auto h-1/2 w-1/2 fill-gold duration-150 ease-in-out group-hover:fill-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
          <path d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
        </svg>
      </button>
    </div>
  );
};

export default FilterBlock;
