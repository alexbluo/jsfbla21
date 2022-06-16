import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import store from "./redux/store";
import "./index.css";

const AttractionsPage = React.lazy(() => import("./pages/AttractionsPage"));
const DetailsPage = React.lazy(() => import("./pages/DetailsPage"));
const Error404Page = React.lazy(() => import("./pages/Error404Page"));
const HelpPage = React.lazy(() => import("./pages/HelpPage"));
const MapPage = React.lazy(() => import("./pages/MapPage"));

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
            <Route
              path="/attractions"
              element={
                <Suspense>
                  <AttractionsPage />
                </Suspense>
              }
            />
            <Route
              path="/attractions/:id"
              element={
                <Suspense>
                  <DetailsPage />
                </Suspense>
              }
            />
            <Route
              path="/map"
              element={
                <Suspense>
                  <MapPage />
                </Suspense>
              }
            />
            <Route
              path="/help"
              element={
                <Suspense>
                  <HelpPage />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense>
                  <Error404Page />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
