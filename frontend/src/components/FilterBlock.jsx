// TODO: clean up internal mongodb naming (facets => filters and typos)
// TODO: but first check if separate facets property in documents is even needed, if not maybe rescrape or do fancy mongodb stuff
// TODO: change dropdown arrow back to svg and test
// TODO: make fulltext search thing actually work

const FilterBlock = ({ onClick, children }) => {
  console.log("FilterBlock render");
  return (
    <div className="flex h-16 max-w-full gap-1 rounded-md border-4 bg-black">
      <div
        className="flex items-center overflow-hidden rounded-l bg-gold px-4 font-raleway text-lg focus:brightness-90"
        type="text"
      >
        <span className="truncate">{children}</span>
      </div>
      <button
        className="group aspect-square h-full rounded-r text-gold duration-200 hover:bg-gold active:brightness-50"
        onClick={onClick}
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
};

export default FilterBlock;
