import ButtonLink from "../components/ButtonLink";
import Dropdown from "../components/Dropdown";

const HelpPage = () => {
  return (
    <>
      <h1 className="page-title">Help</h1>
      <h2 className="pb-4 text-3xl">FAQ</h2>
      <div className="flex flex-col gap-1 rounded-md border-4 bg-black mb-8">
        <Dropdown header="Where is the data collected from?">
          Where is the data collected from?
        </Dropdown>
        <Dropdown header="Where can I find the source code?">
          The source code can be found&nbsp;
          <a href="https://github.com/alexbluo/mdattractions">here</a>.
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
