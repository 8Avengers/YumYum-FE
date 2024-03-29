import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "shared/index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </RecoilRoot>
  </QueryClientProvider>
);
