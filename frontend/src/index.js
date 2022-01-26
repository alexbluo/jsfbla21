import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingPage,
  AttractionsPage,
  DetailsPage,
  HelpPage,
  Error404Page,
  MapPage,
} from "./pages/pageExports";

// REACT
// https://www.robinwieruch.de/react-folder-structure/
// https://reactjs.org/docs/hooks-overview.html hooks
// https://stackoverflow.com/questions/57114044/how-to-add-a-route-to-image-in-react-js image links
// MAPS
// https://developers.google.com/maps/documentation/javascript/adding-a-google-map
// https://www.codeunderscored.com/how-to-get-a-user-location-using-html-and-javascript/
// ROUTING
// https://v5.reactrouter.com/web/guides/quick-start
// https://www.techomoro.com/how-to-create-a-multi-page-website-with-react-in-5-minutes/

// prob use switch instead
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/attractions" element={<AttractionsPage />} />
      <Route exact path="/attractions/:id" element={<DetailsPage />} />
      <Route exact path="/map" element={<MapPage />} />
      <Route exact path="/help" element={<HelpPage />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
