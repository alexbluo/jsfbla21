import Dropdown from "../components/Dropdown";

const HelpPage = () => {
  return (
    <>
      <h1 className="page-title">Help</h1>
      <h2 className="pb-4 text-3xl">FAQ</h2>
      <div className="mb-8 flex flex-col gap-1 rounded-md border-4 bg-black">
        <Dropdown header="Why are my map inputs not showing new locations?">
          <article>
            Most locations are able to reach all areas of Maryland within around
            200-300 kilometers. The limit is set to 400 kilometers in order to
            accomodate for users in far-out regions.
          </article>
        </Dropdown>
        {/* TODO: add block for what if i am not in maryland? */}
        <Dropdown header="Where is the data collected from?">
          <article>
            All data was scraped from&nbsp;
            <a
              className="underline"
              href="https://www.visitmaryland.org/things-to-do/attractions"
            >
              here
            </a>
            &nbsp;using Puppeteer.
          </article>
        </Dropdown>
        <Dropdown header="Where can I find the source code?">
          <article>
            The source code can be found&nbsp;
            <a
              className="underline"
              href="https://github.com/alexbluo/mdattractions"
            >
              here
            </a>
            .
          </article>
        </Dropdown>
      </div>
      <div className="flex w-full justify-center">
        <a href="mailto:alexluo92823@gmail.com">
          <button className="rounded-md bg-red p-4 text-white shadow-md duration-200 hover:brightness-125">
            Contact Me
          </button>
        </a>
      </div>
    </>
  );
};

export default HelpPage;
