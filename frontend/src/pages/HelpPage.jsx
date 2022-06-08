import Dropdown from "../components/Dropdown";

const HelpPage = () => {
  return (
    <>
      <h1 className="page-title">Help</h1>
      <h2 className="pb-4 text-3xl">FAQ</h2>
      <div className="mb-8 flex flex-col gap-1 rounded-md border-4 bg-black">
        {/* TODO: add filtering system (or within, and across), maybe also why is amenities plural, does that affect anything (internal, just ignore lol) */}
        <Dropdown header="Why do my text searches not seem to match the results?">
          <article>
            The search bar performs a full-text search on more fields than just
            the attractions' name. Thus, results may consist of attractions with
            a name, description, amenity, category, or address which matches the
            query. Results are sorted by relevance to the search query!
          </article>
        </Dropdown>
        <Dropdown header="What if I don't want to provide access to my location for the map?">
          <article>
            This website will never collect any user data, and proof can be
            found in the&nbsp;
            <a
              className="underline"
              href="https://github.com/alexbluo/mdattractions"
            >
              GitHub repository
            </a>
            . Users who either do not want to or are unable to provide access to
            their location will still have the ability to view and search all
            attractions. Unfortunately they will not have access to the
            slider/input feature, nor the "show center" and "show all" (enabled
            by default) buttons.
          </article>
        </Dropdown>
        <Dropdown header="How does the map work if I am not located in Maryland?">
          <article>
            The map automatically detects whether the user is within 200
            kilometers of any attraction in Maryland, adjusting accordingly.
            Users located within that threshold will have access to all
            features. Users who are not located within 200 kilometers of any
            attraction in Maryland will still have the ability to view and
            search all attractions. Unfortunately they will not have access to
            the slider/input feature, nor the "show center" and "show all"
            (enabled by default) buttons.
          </article>
        </Dropdown>
        <Dropdown header="Why does the map not show any attractions when the distance is changed?">
          <article>
            Please be sure to input a distance that is high enough to reach
            Maryland, or use the "show all" button to view every attraction.
          </article>
        </Dropdown>
        <Dropdown header="Why is the input distance for the map capped at 200 kilometers?">
          <article>
            The idea is that users taking advantage of the slider/input
            funcationality are only looking for attractions within a reasonable
            distance of their location. Users who wish to view any attractions
            beyond 200 kilometers of their location may use the "show all"
            button.
          </article>
        </Dropdown>
        <Dropdown header="Where is the attraction data collected from?">
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
