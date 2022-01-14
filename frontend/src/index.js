import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingView, AttractionsView, DetailsView, HelpView, Error404View, QnAView } from "./views/viewExports";

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
      <Route exact path="/" element={<LandingView />} />
      <Route exact path="/attractions" element={<AttractionsView />} />
      <Route exact path="/attractions/:id" element={<DetailsView />} />
      <Route exact path="/qna" element={<QnAView />} />
      <Route exact path="/help" element={<HelpView />} />
      <Route path="*" element={<Error404View />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
