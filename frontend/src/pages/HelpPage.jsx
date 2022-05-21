import Dropdown from "../components/Dropdown";

const HelpPage = () => {
  return (
    <>
      <h1 className="page-title">Help</h1>
      <h2 className="pb-4 text-3xl">FAQ</h2>
      <div className="mb-8 flex flex-col gap-1 rounded-md border-4 bg-black">
        <Dropdown header="Where is the data collected from?">
          All data was scraped from&nbsp;
          <a
            className="underline"
            href="https://www.visitmaryland.org/things-to-do/attractions"
          >
            here
          </a>
          &nbsp;using Puppeteer.
        </Dropdown>
        <Dropdown header="Where can I find the source code?">
          The source code can be found&nbsp;
          <a
            className="underline"
            href="https://github.com/alexbluo/mdattractions"
          >
            here
          </a>
          .
        </Dropdown>
      </div>
      <div className="flex w-full justify-center">
        <a href="mailto:alexluo92823@gmail.com">
          <button className="rounded-md bg-red p-4 text-white hover:brightness-75">
            Contact Me
          </button>
        </a>
      </div>
    </>
  );
};

export default HelpPage;
