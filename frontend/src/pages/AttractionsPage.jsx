import Accordion from "../components/Accordion";
import NavBar from "../components/NavBar";
import PreviewList from "../components/PreviewList";

export default function AttractionsPage() {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Attractions</h1>
        <div className="flex w-full flex-col gap-12 xl:flex-row">
          <Accordion />
          <PreviewList />
        </div>
      </div>
    </>
  );
}
