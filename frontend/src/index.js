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

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingView />}>
        <Route path="attractions" element={<AttractionsView />} />
        <Route path="attractions/:attraction_id" element={<DetailsView />} />
        <Route path="qna" element={<QnAView />} />
        <Route path="help" element={<HelpView />} />
        <Route path="*" element={<Error404View />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
