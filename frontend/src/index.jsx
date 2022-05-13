import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
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
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/attractions/:id" element={<DetailsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<Error404Page />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
