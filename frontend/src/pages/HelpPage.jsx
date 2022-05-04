import Dropdown from "../components/Dropdown";
import NavBar from "../components/NavBar";

export default function HelpPage() {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Help</h1>
        <h2 className="pb-4 text-3xl">FAQ</h2>
        <div className="flex flex-col gap-1 rounded-md border-4 bg-black">
          <Dropdown header="currently under construction :D">content</Dropdown>
        </div>
        <h3>Where is the data collected from?</h3>
        <p>
          All data was scraped from&nbsp;
          <a href="https://www.visitmaryland.org/things-to-do/attractions">
            here
          </a>
          &nbsp;using Puppeteer.
        </p>
        <h3>Where can I find the source code?</h3>
        <p>
          The source code can be found&nbsp;
          <a href="https://github.com/alexbluo/jsfbla21">here</a>.
        </p>
        <div className="flex w-full justify-center">
          <a href="mailto:alexluo92823@gmail.com">
            <button className="rounded-md bg-red p-4 text-white hover:brightness-75">
              Contact Me
            </button>
          </a>
        </div>
      </div>
    </>
  );
}
