import Accordion from "../components/Accordion";
import NavBar from "../components/NavBar";
import PreviewList from "../components/PreviewList";
import Search from "../components/Search";

export default function AttractionsPage() {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Attractions</h1>
        <div className="flex w-full flex-col gap-12 xl:flex-row">
          <div className="inline-block w-full xl:w-1/3">
            <Search />
            <Accordion />
          </div>
          <div className="flex w-full flex-col items-center xl:w-2/3">
            <PreviewList />
          </div>
        </div>
      </div>
    </>
  );
}
