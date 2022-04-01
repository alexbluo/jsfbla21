import React from "react";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import Marker from "../components/Marker";

export default function HelpPage() {
  return (
    <>
      <NavBar />
      <div className="content-body-container">
        <h1 className="page-title">Help</h1>
        <h2 className="text-3xl pb-4">FAQ</h2>
        <div className="flex flex-col gap-1 rounded-md border-4 bg-black">
          <Dropdown header="test">i am testig tis</Dropdown>
        </div>
        <div className="">
          <h3>What is the white and red marker on the map?</h3>
          <p>
            The white and red marker is your current location while the black
            and yellow markers are all the attractions within the specified
            distance.
          </p>
          <label>
            <Marker name="Your Location" isCenter /> Your location
            <br />
            <Marker name="Attraction Name" /> Attraction near you
          </label>
          <h3>
            Why are new attractions not appearing on the map after x distance?
          </h3>
          <p>
            The max distance was set to 500km in order to accommodate for users
            in the far out regions of Maryland, but most users will likely max
            out around 250km.
          </p>
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
      </div>
    </>
  );
}
