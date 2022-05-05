import Accordion from "../components/Accordion";
import FilterBlockList from "../components/FilterBlockList";
import NavBar from "../components/NavBar";
import PreviewList from "../components/PreviewList";
import Search from "../components/Search";

const AttractionsPage = () => {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Attractions</h1>
        <div className="flex w-full flex-col gap-12 xl:flex-row">
          <div className="inline-block w-full xl:w-1/3">
            <Search />
            <Accordion />
            <FilterBlockList />
          </div>
          <div className="flex w-full flex-col items-center xl:w-2/3">
            <PreviewList />
          </div>
        </div>
      </div>
    </>
  );
};

export default AttractionsPage;
