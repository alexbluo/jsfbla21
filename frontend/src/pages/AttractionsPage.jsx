import Accordion from "../components/Accordion";
import FilterBlockList from "../components/FilterBlockList";
import PreviewList from "../components/PreviewList";
import SearchBar from "../components/SearchBar";

const AttractionsPage = () => {
  return (
    <>
      <h1 className="page-title">Attractions</h1>
      <div className="flex w-full flex-col gap-12 xl:flex-row">
        <div className="inline-block w-full xl:w-1/3">
          <SearchBar />
          <Accordion />
          <FilterBlockList />
        </div>
        <div className="flex w-full flex-col items-center xl:w-2/3">
          {/* <PreviewList /> */}
        </div>
      </div>
    </>
  );
};

export default AttractionsPage;
