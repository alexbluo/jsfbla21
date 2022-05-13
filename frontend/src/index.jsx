import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import {
  LandingPage,
  AttractionsPage,
  DetailsPage,
  HelpPage,
  Error404Page,
  MapPage,
} from "./pages/pageExports";
import { store } from "./redux/store";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* TODO: bring navbar here? */}
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/attractions" element={<AttractionsPage />} />
          <Route exact path="/attractions/:id" element={<DetailsPage />} />
          <Route exact path="/map" element={<MapPage />} />
          <Route exact path="/help" element={<HelpPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
